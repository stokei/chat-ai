import { UserContent, convertToCoreMessages, streamText, generateText, generateObject } from 'ai';

const buildMessageContent = (text: string, images?: string[]): UserContent => {
  const messageContent: UserContent = [{ type: 'text', text }];

  if (images?.length) {
    images.forEach((url) => {
      const image = new URL(url);
      messageContent.push({ type: 'image', image });
    });
  }

  return messageContent;
};

export const aiUtils = {
  streamText,
  generateText,
  generateObject,
  convertToCoreMessages,
  buildMessageContent,
};
