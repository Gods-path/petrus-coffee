// Server-side proxy for the n8n reservation webhook.
//
// The browser posts the raw form fields to /api/reserve; this route validates
// them, maps them onto the webhook's contract (guest_name / group_size /
// book_time) and forwards the call with the shared secret. The secret and the
// upstream URL never reach the client bundle — nothing here is NEXT_PUBLIC_.
const webhookUrl =
  process.env.N8N_RESERVATION_WEBHOOK_URL ??
  "https://petruscoffee.app.n8n.cloud/webhook/make_reservation";
const webhookSecret = process.env.N8N_RESERVATION_WEBHOOK_SECRET;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 80;
const MAX_PHONE_LENGTH = 32;
const MAX_PARTY_SIZE = 20;
const UPSTREAM_TIMEOUT_MS = 10_000;

type ReservationPayload = {
  guest_name: string;
  guest_phone: string;
  group_size: number;
  book_time: string;
};

function badRequest(message: string) {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

/**
 * Validates the browser payload and maps it to the webhook contract.
 * Returns either the upstream payload or the message to show the guest.
 */
function buildPayload(
  body: unknown,
): { payload: ReservationPayload } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Please fill in every field so we can hold your table." };
  }

  const { name, phone, party, date, time } = body as Record<string, unknown>;

  const guestName = typeof name === "string" ? name.trim() : "";
  if (!guestName) return { error: "Please tell us the name for the table." };
  if (guestName.length > MAX_NAME_LENGTH) {
    return { error: "That name is a little too long — please shorten it." };
  }

  // Deliberately permissive: Cameroonian numbers get written many ways
  // (+237…, 6…, spaced, dashed). Require enough digits to be dialable and
  // leave normalisation to the workflow rather than rejecting real numbers.
  const guestPhone = typeof phone === "string" ? phone.trim() : "";
  const phoneDigits = guestPhone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { error: "Please enter a phone number we can reach you on." };
  }
  if (guestPhone.length > MAX_PHONE_LENGTH) {
    return { error: "That phone number is too long — please check it." };
  }

  // The picker offers "1"…"8" and "9+"; take the leading integer either way.
  const groupSize = Number.parseInt(String(party ?? ""), 10);
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > MAX_PARTY_SIZE) {
    return { error: "Please choose how many guests are coming." };
  }

  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Please choose a date for your visit." };
  }
  if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
    return { error: "Please choose a time for your visit." };
  }

  // Wall-clock time at the shop. No UTC offset is appended: the server may run
  // in any region, so converting here would shift the booking. Douala keeps a
  // single year-round offset, so the local timestamp is unambiguous.
  const bookTime = `${date}T${time}:00`;
  const parsed = new Date(bookTime);
  if (Number.isNaN(parsed.getTime())) {
    return { error: "That date and time didn't look right — please try again." };
  }
  if (parsed.getTime() < Date.now() - 60 * 60 * 1000) {
    return { error: "Please choose a date and time in the future." };
  }

  return {
    payload: {
      guest_name: guestName,
      guest_phone: guestPhone,
      group_size: groupSize,
      book_time: bookTime,
    },
  };
}

export async function POST(request: Request) {
  if (!webhookSecret) {
    // Misconfigured deployment — never fall back to an unauthenticated call.
    console.error("[reserve] N8N_RESERVATION_WEBHOOK_SECRET is not set");
    return Response.json(
      { ok: false, error: "Reservations are unavailable right now. Please call us." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("We couldn't read that request. Please try again.");
  }

  const result = buildPayload(body);
  if ("error" in result) return badRequest(result.error);

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-webhook-secret": webhookSecret,
      },
      body: JSON.stringify(result.payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[reserve] webhook request failed", error);
    return Response.json(
      { ok: false, error: "We couldn't reach our booking system. Please try again." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    // Log the upstream detail server-side; the guest gets a generic message.
    console.error(
      `[reserve] webhook responded ${upstream.status}`,
      await upstream.text().catch(() => ""),
    );
    return Response.json(
      { ok: false, error: "We couldn't confirm that booking. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
