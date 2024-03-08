"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface NewBaordProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoard = ({ orgId, disabled }: NewBaordProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {}}
      className={cn(
        "col-span-1 aspect-[100/127] bg-sky-400 rounded-lg hover:bg-sky-700 flex flex-col items-center justify-center py-6",
        disabled && "opacity-75"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};
