import { chatBrainAgent } from '@/backend/agents/chat/brain';
import { ChatDTO, ChatResponse } from '@/backend/dtos/chat.dto';

export async function chatService({ messages, data }: ChatDTO): Promise<ChatResponse> {
  const chatBrainResponse = await chatBrainAgent().execute({
    data,
    messages,
  });

  return chatBrainResponse;
}
