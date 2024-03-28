"use client";

import { useMutation, useSelf } from "@/liveblocks.config";
import { memo } from "react";
import { AArrowDown, AArrowUp, BringToFront, SendToBack } from "lucide-react";

import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionArea } from "@/hooks/use-selection-area";

import { Camera, Colour, LayerType } from "@/types/layer";

import { LayerColourPicker } from "./layer-colour-picker";
import { HoverHint } from "@/components/hover-hint";
import { Button } from "@/components/ui/button";

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

  const setFontSize = useMutation(
    ({ storage }, change: number) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        const layerType = liveLayers.get(id)?.get("type");

        if (layerType === LayerType.Text || LayerType.Note) {
          const currentFontSize = liveLayers.get(id)?.get("fontSize");

          const defaultChange = change > 0 ? 14 : 10;
          const newFontSize = currentFontSize ? currentFontSize + change : defaultChange;

          liveLayers.get(id)?.set("fontSize", newFontSize);
        }
      });
    },
    [selection]
  );

  const moveToBack = useMutation(({ storage }) => {
    const liveLayersIds = storage.get("layerIds");
    const index: number[] = [];

    const liveLayerArray = liveLayersIds.toArray();

    for (let i = 0; i < liveLayerArray.length; i++) {
      if (selection.includes(liveLayerArray[i])) index.push(i);
    }

    for (let i = 0; i < index.length; i++) {
      liveLayersIds.move(index[i], i);
    }
  }, []);

  const moveToFront = useMutation(({ storage }) => {
    const liveLayersIds = storage.get("layerIds");
    const index: number[] = [];

    const liveLayerArray = liveLayersIds.toArray();

    for (let i = 0; i < liveLayerArray.length; i++) {
      if (selection.includes(liveLayerArray[i])) index.push(i);
    }

    for (let i = index.length; i >= 0; i--) {
      liveLayersIds.move(index[i], index.length - 1 - (index.length - 1 - i));
    }
  }, []);

  const deleteLayers = useDeleteLayers();

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
      <div className="flex flex-col gap-y-0.5">
        <HoverHint label="Bring to Front">
          <Button variant="board" size="icon" onClick={moveToFront}>
            <BringToFront />
          </Button>
        </HoverHint>
        <HoverHint label="Bring to Back">
          <Button variant="board" size="icon" onClick={moveToBack}>
            <SendToBack />
          </Button>
        </HoverHint>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <HoverHint label="Increase Text Size">
          <Button variant="board" size="icon" onClick={() => setFontSize(2)}>
            <AArrowUp />
          </Button>
        </HoverHint>
        <HoverHint label="Decrease Text Size">
          <Button variant="board" size="icon" onClick={() => setFontSize(-2)}>
            <AArrowDown />
          </Button>
        </HoverHint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <HoverHint label="Delete">
          <Button variant="board" size="icon" onClick={deleteLayers} />
        </HoverHint>
      </div>
    </div>
  );
});

LayerTools.displayName = "LayerTools";