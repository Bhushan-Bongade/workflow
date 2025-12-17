import type { NodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/enums";
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/execution/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/manual-triggers/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
} as const satisfies NodeTypes;

export type Registered = keyof typeof nodeComponents;
