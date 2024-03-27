"use client";

import { useStorage } from "@/liveblocks.config";
import { memo } from "react";

import { LayerType } from "@/types/layer";
import { Rectangle } from "./rectangle-layer";
import { Ellipse } from "./ellipse-layer";
import { Text } from "./text-layer";

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
        return <div></div>;
      case LayerType.Path:
        return <div></div>;
      default:
        console.log("error unkonwn type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
