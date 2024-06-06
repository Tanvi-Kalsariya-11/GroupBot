import { openai } from "@/openai";
import { NextRequest, NextResponse } from "next/server";

// Define the POST request handler
export async function POST(
  request: NextRequest,
  { params: { threadId } }: { params: { threadId: string } }
): Promise<Response> {
  const {
    toolCallOutputs,
    runId,
  }: {
    toolCallOutputs: { output: string; tool_call_id: string }[];
    runId: string;
  } = await request.json();

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
