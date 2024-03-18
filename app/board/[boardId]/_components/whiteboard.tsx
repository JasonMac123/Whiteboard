"use client";

import { BoardInfo } from "./board-info";
import { BoardMembers } from "./board-members";
import { ToolKit } from "./tool-kit/index";

import { useSelf } from "@/liveblocks.config";

interface WhiteBoardProps {
  boardId: string;
}

export const WhiteBoard = ({ boardId }: WhiteBoardProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <BoardInfo boardId={boardId} />
      <BoardMembers />
      <ToolKit />
    </main>
  );
};
