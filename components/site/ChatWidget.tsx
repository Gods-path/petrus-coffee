"use client";

import { useEffect } from "react";
import "@n8n/chat/style.css";
import "./chat-widget.css";

// Module-level guard so the widget mounts once (React runs effects twice in dev).
let initialised = false;

/**
 * Floating n8n chatbot, embedded site-wide. The @n8n/chat runtime touches
 * `window`/`document`, so it's imported dynamically inside an effect (client only).
 */
export function ChatWidget() {
  useEffect(() => {
    if (initialised) return;
    initialised = true;

    let cancelled = false;
    import("@n8n/chat").then(({ createChat }) => {
      if (cancelled) return;
      createChat({
        // Same-origin proxy (app/api/chat) → forwards to the n8n webhook,
        // sidestepping browser CORS on every deployment.
        webhookUrl: `${window.location.origin}/api/chat`,
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: true,
        initialMessages: [
          "Hi there! ☕",
          "Welcome to Petrus Coffee. Ask me about our menu, opening hours, events, or reserving a table.",
        ],
        i18n: {
          en: {
            title: "Petrus Coffee",
            subtitle: "We usually reply in a few moments.",
            footer: "",
            getStarted: "New conversation",
            inputPlaceholder: "Ask us anything…",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Mount point for the widget (default target selector is "#n8n-chat").
  return <div id="n8n-chat" />;
}
