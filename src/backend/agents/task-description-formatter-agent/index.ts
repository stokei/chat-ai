import { TaskDescriptionFormatterDTO } from "@/backend/dtos/task-description-formatter-agent.dto";
import { OPENAI_MODEL, openaiProvider } from "@/backend/providers/openai-provider";
import { aiUtils } from "@/backend/utils/ai";

const systemPrompt = `
Você é um assistente especializado em redação técnica para times de produto e engenharia. Seu papel é expandir títulos curtos de tarefas em descrições de issue mais detalhadas, claras e úteis para o time de desenvolvimento.

**Entrada:** Apenas o título da tarefa (uma frase simples, como “Adicionar botão de login no header”).

**Regras para a saída:**

* Gere apenas a **descrição detalhada da issue**, sem mencionar o título.
* Seja direto e informativo.
* Especifique o que deve ser feito, onde, e com que objetivo.
* Inclua, se relevante, contexto de uso, restrições, e critérios de aceitação implícitos.
* Use linguagem neutra e objetiva.
* Não adicione marcações, títulos, seções ou mensagens fora da descrição.

**Exemplo de entrada:**
\`Adicionar botão de login no header\`

**Exemplo de saída esperada:**
Adicionar um botão "Login" no canto superior direito do header do site. O botão deve redirecionar para a página de autenticação. Garantir que o estilo do botão esteja alinhado com o design atual (cor, tipografia e espaçamento). O botão deve ser visível apenas para usuários não autenticados.
`;

export const taskDescriptionFormatterAgent = () => {
  return {
    execute: async ({ taskDescription }: TaskDescriptionFormatterDTO): Promise<string> => {
      const { text: response } = await aiUtils.generateText({
        model: openaiProvider(OPENAI_MODEL.MODEL_4_1),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: taskDescription },
        ],
      });

      return response;
    }
  }
}
