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
    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate a response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
