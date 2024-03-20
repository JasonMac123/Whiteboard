"use client";

import { useStorage } from "@/liveblocks.config";
import { memo } from "react";

import { LayerType } from "@/types/layer";

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
        return <div></div>;
      case LayerType.Text:
        return <div></div>;
      case LayerType.Ellipse:
        return <div></div>;
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
