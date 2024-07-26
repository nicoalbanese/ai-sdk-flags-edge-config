import { convertToCoreMessages, streamText } from 'ai';
import { registry, modelId } from '@/lib/ai-config';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = await modelId() as string;

  const result = await streamText({
    model: registry.languageModel(model),
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}