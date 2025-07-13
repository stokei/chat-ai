import { Message } from "ai";

export interface ChatDTO {
  messages: Message[];
  data?: {
    images?: string[];
  };
}

interface Task {
  title: string;
  description: string;
}

export interface ChatResponse {
  tasks_approved: boolean;
  tasks?: Task[];
  agent_message: string;
}
