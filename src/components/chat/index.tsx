"use client"

import { backendRoutes } from '@/backend/constants/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { useState } from 'react';
import { z } from 'zod';

const chatAgentSchema = z.object({
  tasks_approved: z.boolean(),
  tasks: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  agent_message: z.string()
});

export function Chat() {
  const [messages, setMessages] = useState<{ id: string; role: string; content: string; }[]>([]);

  const { submit, isLoading } = useObject({
    api: backendRoutes.CHAT,
    schema: chatAgentSchema,
    onFinish(event) {
      const newMessage = {
        id: Date.now()+'',
        role: 'assistant',
        content: event?.object?.agent_message || '',
      };
      setMessages(prev => [...prev, newMessage]);
    },
  });

  return (
    <Card className="w-full max-w-[500px] h-full">
      <CardHeader>
        <CardTitle>
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-4">
        <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {messages?.map(message => (
          <Card key={message.id} className="h-fit">
            <CardHeader>
              {message.role}
            </CardHeader>
            <CardContent>
              {message.content}
            </CardContent>
          </Card>
        ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          className="w-full flex flex-row items-center justify-center gap-4"
          onSubmit={e => {
            e.preventDefault();
            const content = e.currentTarget.content.value.trim();
            if (!content) return;
            submit({
              messages: [...messages, { id: Date.now()+'', role: 'user', content }],
            });
          }}
        >
          <Textarea
            name="content"
            placeholder="Escreva sua mensagem..."
          />
          <Button type="submit" isLoading={isLoading}>Submit</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
