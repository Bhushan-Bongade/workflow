import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/manual-triggers/executor";
import { httpRequestTriggerExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/stripe-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestTriggerExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: () => {
    throw new Error("Anthropic executor not implemented");
  },
  [NodeType.OPENAI]: () => {
    throw new Error("OpenAI Chat executor not implemented");
  },
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];

  if (!executor) {
    throw new Error(`No executor found for Node Type: ${type}`);
  }

  return executor;
};
