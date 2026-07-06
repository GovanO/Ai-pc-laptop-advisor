import { NextRequest, NextResponse } from "next/server";
import { storeMessagePair, getMessages } from "@/lib/messages";

/**
 * POST /api/messages
 * Stores a message pair (user prompt + AI response) to the json-server database.
 * Body: { userMessage: string; aiMessage: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userMessage, aiMessage, prompt } = body;

    console.warn(`Prompt: ${prompt}`);

    // Validate input
    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid userMessage" },
        { status: 400 }
      );
    }

    if (!aiMessage || typeof aiMessage !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid aiMessage" },
        { status: 400 }
      );
    }

    // Store the message pair
    await storeMessagePair(userMessage, aiMessage);

    return NextResponse.json(
      { success: true, message: "Message pair stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return NextResponse.json(
      { error: "Failed to store message pair" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/messages
 * Retrieves all stored messages from the json-server database.
 */
export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/messages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}
