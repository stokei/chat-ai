import { chatAgent } from '@/backend/agents/chat';
import { requirementsEngineerAgent } from '@/backend/agents/requirements-engineer';
import { taskDescriptionFormatterAgent } from '@/backend/agents/task-description-formatter-agent';
import { ChatDTO, ChatResponse } from '@/backend/dtos/chat.dto';

export async function chatService({ messages, data }: ChatDTO): Promise<ChatResponse> {
  const chatAgentResponse = await chatAgent().execute({
    data,
    messages,
  });

  let tasks: ChatResponse['tasks'] = [];
  if (chatAgentResponse?.tasks_approved && chatAgentResponse?.tasks?.length) {
    tasks = await Promise.all(chatAgentResponse.tasks?.map(async task => {
      const taskDescriptionFormatterAgentResponse = await taskDescriptionFormatterAgent().execute({
        taskDescription: task.title,
      });
      if (!taskDescriptionFormatterAgentResponse) {
        return {
          title: task.title,
          description: '',
        };
      }
      const requirementsEngineerAgentResponse = await requirementsEngineerAgent().execute({
        taskDescription: taskDescriptionFormatterAgentResponse,
      });

      const description = `
        ## 📝 Descrição

        ${taskDescriptionFormatterAgentResponse}

        ## ✅ Regras Funcionais

        - ${requirementsEngineerAgentResponse.functionalRequirements?.join('\n- ') || 'Nenhuma regra funcional identificada.'}

        ## 📐 Regras Não-Funcionais

        - ${requirementsEngineerAgentResponse.nonFunctionalRequirements?.join('\n- ') || 'Nenhuma regra não funcional identificada.'}

        ## 🧪 Cenários de Teste

        ### Cenários Positivos
        {{ $('QA_BDDTestAgent').item.json['positiveScenarios'].join('\n\n') }}

        ### Cenários Negativos
        {{ $('QA_BDDTestAgent').item.json['negativeScenarios'].join('\n\n') }}

        ## 🎨 UX/UI

        {{ $('UXDesignerAgent').item.json['designer.description'] }}
      `;
      return {
        title: task.title,
        description
      }
    }));
  }

  return {
    ...chatAgentResponse,
    tasks
  };
}
