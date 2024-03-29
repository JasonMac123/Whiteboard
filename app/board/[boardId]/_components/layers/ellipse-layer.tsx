"use client";

import rgbHex from "rgb-hex";

import { EllipseLayer } from "@/types/layer";

interface EllipseLayerProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColour?: string;
}

export const Ellipse = ({ id, layer, onPointerDown, selectionColour }: EllipseLayerProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? rgbHex(fill.r, fill.g, fill.b) : "#7afcff"}
      stroke={selectionColour || "transparent"}
      strokeWidth={1}
    />
  );
};
