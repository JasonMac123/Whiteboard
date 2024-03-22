"use client";

import { memo } from "react";
import { useSelf, useStorage } from "@/liveblocks.config";

import { Side, XYWH } from "@/types/whiteboard";
import { LayerType } from "@/types/layer";
import { useSelectionArea } from "@/hooks/use-selection-area";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, intialBounds: XYWH) => void;
}

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const layerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const showingHandles = useStorage(
      (root) => layerId && root.layers.get(layerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionArea();

    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.heigth}
        />
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
