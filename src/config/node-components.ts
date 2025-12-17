import type { NodeTypes } from "@xyflow/react";
import { NodeType } from "@/generated/prisma/client";
import { InitialNode } from "@/components/initial-node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type Registered = keyof typeof nodeComponents;
