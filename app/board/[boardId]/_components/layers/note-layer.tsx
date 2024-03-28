import { Kalam } from "next/font/google";
import rgbHex from "rgb-hex";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";

import { cn } from "@/lib/utils";

import { NoteLayer } from "@/types/layer";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface NoteLayerProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColour?: string;
}

export const Note = ({ id, layer, onPointerDown, selectionColour }: NoteLayerProps) => {
  const { x, y, width, height, fill, textFill, value, fontSize } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColour ? `1px solid ${selectionColour}` : "none",
        backgroundColor: fill ? rgbHex(fill.r, fill.g, fill.b) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          color: fill ? rgbHex(textFill.r, textFill.g, textFill.b) : "#000",
          fontSize: fontSize,
        }}
      />
    </foreignObject>
  );
};