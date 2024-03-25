import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import { WhiteBoardMode, WhiteBoardState } from "@/types/whiteboard";
import { LayerType } from "@/types/layer";

interface ToolKitProps {
  WhiteBoardState: WhiteBoardState;
  setWhiteBoardState: (newState: WhiteBoardState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const ToolKit = ({
  WhiteBoardState,
  setWhiteBoardState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolKitProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white roudned-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setWhiteBoardState({ mode: WhiteBoardMode.None })}
          active={
            WhiteBoardState.mode === WhiteBoardMode.None ||
            WhiteBoardState.mode === WhiteBoardMode.Translating ||
            WhiteBoardState.mode === WhiteBoardMode.SelectionNet ||
            WhiteBoardState.mode === WhiteBoardMode.Pressing ||
            WhiteBoardState.mode === WhiteBoardMode.Resizing
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setWhiteBoardState({ mode: WhiteBoardMode.Pencil })}
          active={WhiteBoardState.mode === WhiteBoardMode.Pencil}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            setWhiteBoardState({
              mode: WhiteBoardMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          active={
            WhiteBoardState.mode === WhiteBoardMode.Inserting &&
            WhiteBoardState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() =>
            setWhiteBoardState({
              mode: WhiteBoardMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          active={
            WhiteBoardState.mode === WhiteBoardMode.Inserting &&
            WhiteBoardState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setWhiteBoardState({
              mode: WhiteBoardMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          active={
            WhiteBoardState.mode === WhiteBoardMode.Inserting &&
            WhiteBoardState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setWhiteBoardState({
              mode: WhiteBoardMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          active={
            WhiteBoardState.mode === WhiteBoardMode.Inserting &&
            WhiteBoardState.layerType === LayerType.Ellipse
          }
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton label="Undo" icon={Undo2} onClick={undo} disabled={!canUndo} />
        <ToolButton label="Redo" icon={Redo2} onClick={redo} disabled={!canRedo} />
      </div>
    </div>
  );
};

export const ToolKitSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[400px] w-[60px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
