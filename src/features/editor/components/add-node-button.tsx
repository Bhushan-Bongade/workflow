"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { NodeSelector } from "../../../components/node-selector";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        size="icon"
        variant="outline"
        className="bg-background cursor-pointer"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});
