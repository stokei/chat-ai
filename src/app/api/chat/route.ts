import { createOllama } from 'ollama-ai-provider';
import { streamText, convertToCoreMessages, UserContent } from 'ai';
import { API_MODEL } from '@/constants/ai-model';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Destructure request data
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1); 
  const currentMessage = messages[messages.length - 1]; 

  const ollama = createOllama({});

  // Build message content array directly
  const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }];

  // Add images if they exist
  data?.images?.forEach((imageUrl: string) => {
    const image = new URL(imageUrl);
    messageContent.push({ type: 'image', image });
  });

  // Stream text using the ollama model
  const result = await streamText({
    model: ollama(API_MODEL),
    messages: [
      ...convertToCoreMessages(initialMessages),
      { role: 'user', content: messageContent },
    ],
  });

  return result.toDataStreamResponse();
}
