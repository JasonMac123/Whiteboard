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
  return <ellipse />;
};
