// Same-origin proxy for the n8n chat webhook. The browser talks to /api/chat
// (no CORS), and the server forwards to the n8n Chat Trigger. This removes the
// dependency on n8n's "Allowed Origins" setting and works on any deployment.
//
// The webhook URL lives here (server-only) so it stays out of the client bundle.
// Override with the N8N_CHAT_WEBHOOK_URL env var (not NEXT_PUBLIC_ — server-side only).
const chatWebhookUrl =
  process.env.N8N_CHAT_WEBHOOK_URL ??
  "https://petruscoffee.app.n8n.cloud/webhook/ff5641a6-e66a-40a5-a2c8-f7ee06d18275/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function forward(request: Request): Promise<Response> {
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const upstream = await fetch(chatWebhookUrl, {
    method: request.method,
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
    },
    body: hasBody ? await request.arrayBuffer() : undefined,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export const GET = forward;
export const POST = forward;
