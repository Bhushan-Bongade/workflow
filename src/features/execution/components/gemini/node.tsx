"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { AVAILABLE_MODELS, GeminiDialog, GeminiFormValue } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiToken } from "./actions";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";

type GeminiNodeData = {
  modal: any;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
  variableName?: string;
};

type GeminiNodeProps = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeProps>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: GEMINI_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchGeminiToken,
  });

  const handleSettingsOpen = () => setDialogOpen(true);

  const handleSubmit = (values: GeminiFormValue) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id == props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };

  const nodeData = props.data;
  const description = nodeData.userPrompt
    ? `${nodeData.modal || AVAILABLE_MODELS[0]}: ${nodeData.userPrompt.slice(
        0,
        30
      )}...`
    : "Not configured";

  return (
    <>
      <GeminiDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={"/logos/gemini.svg"}
        name="Gemini"
        description={description}
        onSettings={handleSettingsOpen}
        onDoubleClick={handleSettingsOpen}
        status={nodeStatus}
      />
    </>
  );
});

GeminiNode.displayName = "GeminiNode";
