import * as dotenv from "dotenv";
import { createSDK } from "@epam/ai-dial-typescript-sdk";

dotenv.config();

export async function connectToChatGPTModel() {

  const dialApiKey = process.env.DIAL_API_KEY?.trim();
  if (!dialApiKey) {
    throw new Error("DIAL_API_KEY is not configured.");
  }

  const dialBaseUrl = process.env.DIAL_BASE_URL?.trim();
  if (!dialBaseUrl) {
    throw new Error("DIAL_BASE_URL is not configured.");
  }

  const sdk = createSDK({
    baseUrl: dialBaseUrl,
    apiKey: dialApiKey,
  });

  return sdk;
}

const PC_LAPTOP_ONLY_INSTRUCTION = `You are a personal computer and laptop expert. Answer only questions about PC and laptop hardware, configurations, or buying advice. Do not provide recommendations or comparisons for phones, tablets, wearables, smartwatches, IoT devices, or any other non-PC or non-laptop hardware.

Only stay focused on desktops, notebooks, gaming laptops, related PC/laptop topics, public prices and all the peripherals that those devices consist of: graphic cards, RAM, processors, .etc, basially anything that is related to pc/laptop and it's potential usage purpose.

If the user asks about something not anyhow related to pc or laptops, reply exactly: "I'm sorry but I can only answer pc/laptop related questions."`;

export async function generateChatResponse(prompt: string) {
  const sdk = await connectToChatGPTModel();
  const modelName = process.env.DIAL_MODEL_NAME?.trim() || "gpt-4o";

  try {
    const response = (await sdk.sendChatCompletionRequest(modelName, {
      body: {
        messages: [
          { role: "system", content: PC_LAPTOP_ONLY_INSTRUCTION },
          { role: "user", content: prompt },
        ],
      },
    })) as { data?: { choices?: Array<{ message?: { content?: string } }> }; error?: unknown };

    if (response.error) {
      throw new Error(typeof response.error === "string" ? response.error : "The model request failed.");
    }

    const responseText = response.data?.choices?.[0]?.message?.content;
    if (typeof responseText === "string" && responseText.trim()) {
      return responseText;
    }

    throw new Error("The model did not return a text response.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate model response: ${errorMessage}`);
  }
}
