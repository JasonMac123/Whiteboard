"use client";

import { Camera, Colour } from "@/types/layer";
import { memo } from "react";

interface LayerToolsProps {
  camera: Camera;
  setLastColour: (colour: Colour) => void;
}

export const LayerTools = memo(({ camera, setLastColour }: LayerToolsProps) => {
  return <div></div>;
});

LayerTools.displayName = "LayerTools";
