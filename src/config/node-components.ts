import type { NodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/execution/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/manual-triggers/node";
import { GoogleFormTriggerNode } from "@/features/triggers/google-form-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/stripe-trigger/node";
import { GeminiNode } from "@/features/execution/components/gemini/node";
import { DiscordNode } from "@/features/execution/components/discord/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.DISCORD]: DiscordNode,
} as const satisfies NodeTypes;

export type Registered = keyof typeof nodeComponents;
