import { RectangleLayer } from "@/types/layer";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColour?: string;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColour,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={0}
      height={0}
      strokeWidth={1}
      fill="#000"
      stroke="transparent"
    />
  );
};
