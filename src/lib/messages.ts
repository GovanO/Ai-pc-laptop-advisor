const RESOURCE_URL = "http://localhost:3001/messages";
const MAX_PAIRS = 30; // Keep last 30 message pairs

export interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

async function fetchAllMessages(): Promise<Message[]> {
  const response = await fetch(`${RESOURCE_URL}?_sort=timestamp&_order=asc`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch messages: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as Message[];
}

/**
 * Stores a message pair (user + assistant) in the json-server database.
 * Enforces a rolling window of the last 30 message pairs (60 total messages).
 */
export async function storeMessagePair(
  userMessage: string,
  aiMessage: string
): Promise<void> {
  try {
    const messages = await fetchAllMessages();
    const now = Date.now();

    const newMessages = [
      { role: "user" as const, content: userMessage, timestamp: now },
      { role: "assistant" as const, content: aiMessage, timestamp: now + 1 },
    ];

    for (const message of newMessages) {
      const postResponse = await fetch(RESOURCE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!postResponse.ok) {
        throw new Error(
          `Failed to create message: ${postResponse.status} ${postResponse.statusText}`
        );
      }
    }

    const totalMessages = messages.length + newMessages.length;
    const maxMessages = MAX_PAIRS * 2;

    if (totalMessages > maxMessages) {
      const overflowPairs = Math.ceil((totalMessages - maxMessages) / 2);
      const messagesToRemove = overflowPairs * 2;
      const deletionCandidates = messages.slice(0, messagesToRemove);

      for (const message of deletionCandidates) {
        if (typeof message.id !== "number") {
          continue;
        }

        const deleteResponse = await fetch(`${RESOURCE_URL}/${message.id}`, {
          method: "DELETE",
        });

        if (!deleteResponse.ok) {
          throw new Error(
            `Failed to delete message ${message.id}: ${deleteResponse.status} ${deleteResponse.statusText}`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error storing message pair:", error);
    throw error;
  }
}

/**
 * Retrieves all stored messages from json-server.
 */
export async function getMessages(): Promise<Message[]> {
  try {
    return await fetchAllMessages();
  } catch (error) {
    console.error("Error retrieving messages:", error);
    throw error;
  }
}
