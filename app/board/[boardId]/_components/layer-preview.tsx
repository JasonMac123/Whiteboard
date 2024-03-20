"use client";

import { useStorage } from "@/liveblocks.config";
import { memo } from "react";

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

    return <div></div>;
  }
);

LayerPreview.displayName = "LayerPreview";
