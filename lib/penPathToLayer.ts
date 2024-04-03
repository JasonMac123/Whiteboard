import { Colour, LayerType, PathLayer } from "@/types/layer";

export function penPathToLayer(
  points: [x: number, y: number, pressure: number][],
  colour: Colour
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform with 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - top,
    height: bottom - top,
    fill: colour,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}
