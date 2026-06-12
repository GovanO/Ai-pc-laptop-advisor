"use client";

import { useState } from "react";

export default function ChatLayout() {
  const [message, setMessage] = useState("");

  const prepareChatInput = (value: string) => {
    console.log("Prepared chat input:", value);
    // Placeholder: integrate ChatGPT parsing later.
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    prepareChatInput(trimmed);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#08101f] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-6">
        <header className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-300/80">
                AI Laptop Advisor
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">
                Gaming-inspired chat layout
              </h1>
            </div>
            <span className="inline-flex rounded-full border border-fuchsia-400/20 bg-[#121c35] px-4 py-2 text-sm text-slate-200">
              Asus ROG palette
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1426]/90 shadow-[0_40px_120px_-90px_rgba(0,0,0,0.9)]">
          <section className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-4">
              <article className="rounded-[28px] border border-white/10 bg-[#111a30] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
                <p className="text-sm text-slate-500">Welcome to the chat interface.</p>
                <p className="mt-3 text-base leading-7 text-slate-100">
                  Type your message below and press Enter to prepare it for ChatGPT parsing.
                </p>
              </article>
            </div>
          </section>

          <div className="border-t border-white/10 bg-[#08101f]/95 p-5">
            <div className="mx-auto flex max-w-5xl flex-col gap-3">
              <label htmlFor="chat-input" className="text-sm text-slate-400">
                Enter text
              </label>
              <textarea
                id="chat-input"
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about gaming laptops, desktops, or hardware..."
                className="min-h-[96px] w-full resize-none rounded-[24px] border border-white/10 bg-[#0f1730] px-4 py-4 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-fuchsia-400/70 focus:ring-2 focus:ring-fuchsia-400/20"
              />
              <p className="text-xs text-slate-500">
                Press Enter to submit. Shift+Enter creates a new line.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
