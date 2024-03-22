import { shallow } from "@liveblocks/react";

import { Layer } from "@/types/layer";
import { XYWH } from "@/types/whiteboard";

import { useStorage, useSelf } from "@/liveblocks.config";

const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let [left, right, top, bottom] = [
    first.x,
    first.x + first.width,
    first.y,
    first.y + first.height,
  ];

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    heigth: bottom - top,
  };
};


export const useSelectionArea = () => {
  const selection = useSelf((me) => me.presence.selection)

  return useStorage((root) => {
    const selectedLayers = selection.map((layerId) => root.layers.get(layerId)!).filter(Boolean)

    return boundingBox(selectedLayers)
  }, shallow)
}