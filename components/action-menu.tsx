"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ConfirmDialog } from "./confirm-dialog";
import { Button } from "./ui/button";

interface ActionMenuProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const ActionMenu = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionMenuProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Copied board link"))
      .catch(() => toast.error("Failed to copy board link"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-64"
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy Board Link
        </DropdownMenuItem>
        <ConfirmDialog
          header="Delete board?"
          description="This will delete the board and its content forever"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Board
          </Button>
        </ConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
