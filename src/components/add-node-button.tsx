"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "./ui/button";

export const AddNodeButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size="icon"
      variant="outline"
      className="bg-background cursor-pointer"
    >
      <PlusIcon />
    </Button>
  );
});
