import { Point } from "@/types/whiteboard";

export function getAngle(point: Point): number {
  if (point.x < 0 && point.y > 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }

  if (point.x > 0 && point.y < 0) {
    return 360 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }

  if (point.x < 0 && point.y < 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }

  return (Math.atan(point.y / point.x) * 180) / Math.PI;
}
