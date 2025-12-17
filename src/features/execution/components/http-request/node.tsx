"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";

type HttpRequestNodeData = {
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeProps = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
  (props: NodeProps<HttpRequestNodeProps>) => {
    const nodeData = props.data as HttpRequestNodeData;
    const description = nodeData?.endPoint
      ? `${nodeData.method || "GET"}: ${nodeData.endPoint}`
      : "Not configured";

    return (
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    );
  }
);

HttpRequestNode.displayName = "HttpRequestNode";
