import { Message } from "ai";

export interface ChatDTO {
  messages: Message[];
  data?: {
    images?: string[];
  };
}

export interface ChatResponse {
  tasks_approved: boolean;
  tasks?: string[];
  agent_message: string;
}
