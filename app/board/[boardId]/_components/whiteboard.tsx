"use client";

import { useState } from "react";

import { CanvasMode, CanvasState } from "@/types/canvas";

import { useHistory, useCanRedo, useCanUndo } from "@/liveblocks.config";

import { BoardInfo } from "./board-info";
import { BoardMembers } from "./board-members";
import { ToolKit } from "./tool-kit/index";

interface WhiteBoardProps {
  boardId: string;
}

export const WhiteBoard = ({ boardId }: WhiteBoardProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <BoardInfo boardId={boardId} />
      <BoardMembers />
      <ToolKit
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};
