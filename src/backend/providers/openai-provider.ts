import { openai } from '@ai-sdk/openai';

export const openaiProvider = (model: string) => openai(model);
export const OPENAI_MODEL = {
  MODEL_4_1: 'gpt-4.1'
};
