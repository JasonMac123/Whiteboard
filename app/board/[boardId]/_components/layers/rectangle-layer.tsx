import rgbHex from "rgb-hex";

import { RectangleLayer } from "@/types/layer";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColour?: string;
}

export const Rectangle = ({ id, layer, onPointerDown, selectionColour }: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? `#${rgbHex(fill.r, fill.g, fill.b)}` : "#7afcff"}
      stroke={selectionColour || "transparent"}
    />
  );
};
