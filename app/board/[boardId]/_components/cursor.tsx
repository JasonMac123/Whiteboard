"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@/liveblocks.config";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || "Team Member";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={50}
      className="relative drop-shadow-md"
    >
      <MousePointer2 className="h-5 w-5 fill-sky-400 text-sky-400" />
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
