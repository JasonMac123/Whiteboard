"use client";

import { useStorage } from "@/liveblocks.config";
import { memo } from "react";

import { LayerType } from "@/types/layer";
import { Rectangle } from "./rectangle-layer";
import { Ellipse } from "./ellipse-layer";
import { Text } from "./text-layer";
import { Note } from "./note-layer";
import { Path } from "./path-layer";
import rgbHex from "rgb-hex";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColour?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColour }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColour={selectionColour}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColour={selectionColour}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColour={selectionColour}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColour={selectionColour}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={id}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? `#${rgbHex(layer.fill.r, layer.fill.g, layer.fill.b)}` : "#000"}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            stroke={selectionColour}
          />
        );
      default:
        console.log("error unkonwn type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
