import * as dotenv from "dotenv";
import { createSDK } from "@epam/ai-dial-typescript-sdk";

dotenv.config();

let sdkPromise: ReturnType<typeof createSDK> | null = null;

export async function connectToChatGPTModel() {
  if (sdkPromise) {
    return sdkPromise;
  }

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

  sdkPromise = sdk;
  return sdk;
}

export async function generateChatResponse(prompt: string) {
  const sdk = await connectToChatGPTModel();
  const modelName = process.env.DIAL_MODEL_NAME?.trim() || "gpt-4o";

  try {
    const response = (await sdk.sendChatCompletionRequest(modelName, {
      body: {
        messages: [{ role: "user", content: prompt }],
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
