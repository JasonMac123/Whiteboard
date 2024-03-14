"use client";

import { BoardInfo } from "./board-info";
import { BoardMembers } from "./board-members";
import { ToolKit } from "./tool-kit";

interface WhiteBoardProps {
  boardId: string;
}

export const WhiteBoard = ({ boardId }: WhiteBoardProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <BoardInfo />
      <BoardMembers />
      <ToolKit />
    </main>
  );
};
