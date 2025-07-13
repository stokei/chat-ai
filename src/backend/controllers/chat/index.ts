import { chatService } from '@/backend/services/chat';
import { NextResponse } from 'next/server';

export async function chatController(req: Request) {
  const { messages, data } = await req.json();
  const response = await chatService({
    messages,
    data
  });
  return NextResponse.json(response);
}
