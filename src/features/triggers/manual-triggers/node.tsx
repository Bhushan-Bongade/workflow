import { NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo } from "react";
import { BaseTriggerNode } from "../components/base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseTriggerNode
      {...props}
      icon={MousePointerIcon}
      name="When clicking execute workflow"
      //   status={nodeStatus}
      onSettings={() => {}}
      onDoubleClick={() => {}}
    />
  );
});
