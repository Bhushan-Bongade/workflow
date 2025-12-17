"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "./ui/button";
import { NodeSelector } from "./node-selector";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        onClick={() => {}}
        size="icon"
        variant="outline"
        className="bg-background cursor-pointer"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});
