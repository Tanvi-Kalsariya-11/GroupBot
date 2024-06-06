import { assistantId } from "@/app/assistant-config";
import { openai } from "@/openai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

// Define the POST request handler
export async function POST(
  request: NextRequest,
  { params: { threadId } }: { params: { threadId: string } }
): Promise<Response> {
  const { content }: { content: string } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
