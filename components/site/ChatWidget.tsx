"use client";

import { useEffect, useRef } from "react";
import "@n8n/chat/style.css";
import "./chat-widget.css";

/**
 * Floating n8n chatbot, embedded site-wide. The @n8n/chat runtime touches
 * `window`/`document`, so it's imported dynamically inside an effect (client only).
 */
export function ChatWidget() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The "already initialised" flag lives on the DOM node, not in module scope:
    // Fast Refresh keeps module state alive but hands the component a fresh,
    // empty node, so a module-level flag would leave the widget permanently
    // missing until a hard reload. Set synchronously, before the dynamic import,
    // so React's double-invoked dev effect can't start two widgets.
    const mount = mountRef.current;
    if (!mount || mount.dataset.chatInit) return;
    mount.dataset.chatInit = "1";

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
      // Nothing rendered yet (the import was still in flight), so release the
      // flag and let the next mount try again.
      if (mount.childElementCount === 0) delete mount.dataset.chatInit;
    };
  }, []);

  // Mount point for the widget (default target selector is "#n8n-chat").
  return <div id="n8n-chat" ref={mountRef} />;
}
