"use client";

import { useMutation, useSelf } from "@/liveblocks.config";
import { memo } from "react";

import { Camera, Colour } from "@/types/layer";
import { useSelectionArea } from "@/hooks/use-selection-area";
import { LayerColourPicker } from "./layer-colour-picker";

interface LayerToolsProps {
  camera: Camera;
  setLastColour: (colour: Colour) => void;
}

export const LayerTools = memo(({ camera, setLastColour }: LayerToolsProps) => {
  const selection = useSelf((me) => me.presence.selection);

  const setLayerFill = useMutation(
    ({ storage }, fill: Colour) => {
      const liveLayers = storage.get("layers");
      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastColour]
  );

  const selectionArea = useSelectionArea();

  if (!selectionArea) {
    return null;
  }

  const x = selectionArea.width / 2 + selectionArea.x + camera.x;
  const y = selectionArea.y + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm b order flex select-none"
      style={{ transform: `translate(calc(${x}px - 50%), calc(${y - 16} - 100%))` }}
    >
      <LayerColourPicker onChange={setLayerFill} />
    </div>
  );
});

LayerTools.displayName = "LayerTools";
