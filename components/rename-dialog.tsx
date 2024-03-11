"use client";

import { useRenameDialog } from "@/store/rename-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";

export const RenameDialog = () => {
  const { isOpen, onClose, initialValues } = useRenameDialog();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a title to update with new board title
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
