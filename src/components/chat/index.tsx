"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
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
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="shadcn"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" isLoading={isLoading}>Submit</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
