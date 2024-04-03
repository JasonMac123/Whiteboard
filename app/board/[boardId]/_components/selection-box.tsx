"use client";

import { memo } from "react";
import { useSelf, useStorage } from "@/liveblocks.config";

import { Side, XYWH } from "@/types/whiteboard";
import { LayerType } from "@/types/layer";
import { useSelectionArea } from "@/hooks/use-selection-area";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, intialBounds: XYWH) => void;
}

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
  const layerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const showingHandles = useStorage(
    (root) => layerId && root.layers.get(layerId)?.type !== LayerType.Path
  );

  const rotationAngle = useStorage((root) => layerId && root.layers.get(layerId)?.rotation) || 0;

  const bounds = useSelectionArea();

  if (!bounds) {
    return null;
  }

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px) rotate(${rotationAngle * 2}deg)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {showingHandles && (
        <>
          {/* top-left resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x - 4}px, ${
                bounds.y - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
            }}
          />
          {/* top-middle resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x + bounds.width / 2 - 4}px, ${
                bounds.y - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top, bounds);
            }}
          />
          {/* top-right resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x - 4 + bounds.width}px, ${
                bounds.y - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
            }}
          />
          {/* middle-right resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x - 4 + bounds.width}px, ${
                bounds.y + bounds.height / 2 - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
          />
          {/* bottom-right resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x + bounds.width - 4}px, ${
                bounds.y + bounds.height - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
            }}
          />
          {/* bottom-middle resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x + bounds.width / 2 - 4}px, ${
                bounds.y + bounds.height - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom, bounds);
            }}
          />
          {/* bottom-left resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x - 4}px, ${
                bounds.y + bounds.height - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
            }}
          />
          {/* middle-left resizing-box*/}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: "8px",
              height: "8px",
              transform: `translate(${bounds.x - 4}px, ${
                bounds.y + bounds.height / 2 - 4
              }px) rotate(${rotationAngle}deg)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, bounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";
