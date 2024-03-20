"use client";

import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";

import { Camera, Colour, LayerType } from "@/types/layer";
import { WhiteBoardMode, Point, WhiteBoardState } from "@/types/whiteboard";

import { pointerEventToWhiteboardPoint } from "@/lib/pointerEventToWhiteboard";

import { BoardInfo } from "./board-info";
import { BoardMembers } from "./board-members";
import { ToolKit } from "./tool-kit/index";
import { CursorPresence } from "./cursor-presence";

interface WhiteBoardProps {
  boardId: string;
}

export const WhiteBoard = ({ boardId }: WhiteBoardProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [whiteboardState, setWhiteboardState] = useState<WhiteBoardState>({
    mode: WhiteBoardMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastColour, setLastColour] = useState<Colour>({ r: 0, g: 0, b: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= 90) {
        return;
      }

      const liveLayersIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType as number,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastColour,
      });

      liveLayersIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setWhiteboardState({ mode: WhiteBoardMode.None });
    },
    [lastColour]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToWhiteboardPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToWhiteboardPoint(e, camera);

      if (whiteboardState.mode === WhiteBoardMode.Inserting) {
        insertLayer(whiteboardState.layerType, point);
      } else {
        setWhiteboardState({
          mode: WhiteBoardMode.None,
        });
      }

      history.resume();
    },
    [camera, whiteboardState, history, insertLayer]
  );

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <BoardInfo boardId={boardId} />
      <BoardMembers />
      <ToolKit
        WhiteBoardState={whiteboardState}
        setWhiteBoardState={setWhiteboardState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-[100vh] g-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};
