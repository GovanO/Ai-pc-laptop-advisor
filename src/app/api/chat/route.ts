import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/dial";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const reply = await generateChatResponse(prompt);

    // Try to store the message pair via the messages endpoint, but don't let storage failure break the chat.
    try {
      const storageUrl = new URL("/api/messages", request.url);
      await fetch(storageUrl.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: prompt, aiMessage: reply }),
      });
    } catch (storageError) {
      console.error("Warning: Failed to store message pair:", storageError);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    const message = error instanceof Error ? error.message : "Unable to generate a response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
