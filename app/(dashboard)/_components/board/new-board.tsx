"use client";

import { Plus } from "lucide-react";

import { toast } from "sonner";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";

interface NewBaordProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoard = ({ orgId, disabled }: NewBaordProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!orgId) return;

    mutate({
      orgId: orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-sky-400 rounded-lg hover:bg-sky-700 flex flex-col items-center justify-center py-6 transition",
        (pending || disabled) && "opacity-75"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};
