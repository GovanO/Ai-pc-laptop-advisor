"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatLayout() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the chat interface. Ask about gaming laptops, desktops, or hardware and I'll route it to the model.",
    },
  ]);
  const [statusMessage, setStatusMessage] = useState("Type your message below and press Enter to submit it to the model.");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch stored messages on component mount
  useEffect(() => {
    const fetchStoredMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch stored messages");
        }
        const storedMessages: Message[] = await response.json();
        if (storedMessages.length > 0) {
          // Prepend stored messages to the welcome message
          setMessages([
            {
              role: "assistant",
              content: "Welcome to the chat interface. Ask about gaming laptops, desktops, or hardware and I'll route it to the model.",
            },
            ...storedMessages,
          ]);
        }
      } catch (error) {
        console.error("Error fetching stored messages:", error);
        // If fetching fails, keep the welcome message - don't break the chat
      }
    };

    fetchStoredMessages();
  }, []);

  const handleSubmit = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setIsLoading(true);
    setStatusMessage("Sending your prompt to the model...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate a response.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "The model did not return a response.",
        },
      ]);
      setStatusMessage("Response received from the model.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to generate a response.";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `Sorry, I could not generate a response. ${errorMessage}`,
        },
      ]);
      setStatusMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    await handleSubmit(message);
  };

  return (
    <div className="min-h-screen bg-[#08101f] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-6">
        <header className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-300/80">
                AI PC/Laptop Advisor
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">
                Chat layout for laptop and desktop advice
              </h1>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1426]/90 shadow-[0_40px_120px_-90px_rgba(0,0,0,0.9)]">
          <section className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-4">
              <article className="rounded-[28px] border border-white/10 bg-[#111a30] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]">
                <p className="text-sm text-slate-500">Welcome to PC/Laptop Advisor interface.</p>
                <p className="mt-3 text-base leading-7 text-slate-100">{statusMessage}</p>
              </article>

              {messages.map((entry, index) => (
                <div
                  key={`${entry.role}-${index}`}
                  className={`max-w-3xl rounded-[24px] border px-4 py-4 ${entry.role === "user" ? "ml-auto border-fuchsia-400/20 bg-fuchsia-500/10" : "border-white/10 bg-[#111a30]"}`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {entry.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">{entry.content}</p>
                </div>
              ))}

              {isLoading ? (
                <div className="max-w-3xl rounded-[24px] border border-white/10 bg-[#111a30] px-4 py-4">
                  <p className="text-sm text-slate-400">Waiting for the model response…</p>
                </div>
              ) : null}
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
