"use client";

import { memo } from "react";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";

import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./layers/path-layer";
import rgbHex from "rgb-hex";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const PencilDrafts = () => {
  const others = useOthersMapped(
    (other) => ({
      PencilDraft: other.presence.pencilDraft,
      penColour: other.presence.penColour,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.PencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.PencilDraft}
              fill={
                other.penColour
                  ? `#${rgbHex(other.penColour.r, other.penColour.g, other.penColour.b)}`
                  : "#000"
              }
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      <PencilDrafts />
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
