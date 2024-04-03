"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import rgbHex from "rgb-hex";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
  useSelf,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";

import { Camera, Colour, LayerType } from "@/types/layer";
import { WhiteBoardMode, Point, WhiteBoardState, Side, XYWH } from "@/types/whiteboard";

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { useDeleteLayers } from "@/hooks/use-delete-layers";

import { pointerEventToWhiteboardPoint } from "@/lib/pointerEventToWhiteboard";
import { resizeBounds } from "@/lib/resizeBounds";
import { randomColourToId } from "@/lib/utils";
import { findIntersectingLayersWithSelection } from "@/lib/findIntersectingLayersWithSelection";
import { penPathToLayer } from "@/lib/penPathToLayer";

import { BoardInfo } from "./board-layout/board-info";
import { BoardMembers } from "./board-layout/board-members";
import { ToolKit } from "./board-layout/tool-kit/index";

import { LayerTools } from "./layers/layer-tools";
import { LayerPreview } from "./layers/layer-preview";
import { Path } from "./layers/path-layer";

import { CursorPresence } from "./cursor-presence";
import { SelectionBox } from "./selection-box";

interface WhiteBoardProps {
  boardId: string;
}

export const WhiteBoard = ({ boardId }: WhiteBoardProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  const [whiteboardState, setWhiteboardState] = useState<WhiteBoardState>({
    mode: WhiteBoardMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastColour, setLastColour] = useState<Colour>({ r: 0, g: 0, b: 0 });

  const deleteLayers = useDeleteLayers();
  useDisableScrollBounce();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  useEffect(() => {
    function onKeyDown(evt: KeyboardEvent) {
      switch (evt.key) {
        case "z": {
          if (evt.ctrlKey || evt.metaKey) {
            if (evt.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
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
        rotation: 0,
      });

      liveLayersIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setWhiteboardState({ mode: WhiteBoardMode.None });
    },
    [lastColour]
  );

  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const resizeLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (whiteboardState.mode !== WhiteBoardMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(whiteboardState.initialBounds, whiteboardState.corner, point);

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [whiteboardState]
  );

  const translateLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (whiteboardState.mode !== WhiteBoardMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - whiteboardState.current.x,
        y: point.y - whiteboardState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setWhiteboardState({ mode: WhiteBoardMode.Translating, current: point });
    },
    [whiteboardState]
  );

  const selectMultipleLayers = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setWhiteboardState({
        mode: WhiteBoardMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setWhiteboardState({
        mode: WhiteBoardMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithSelection(layerIds, layers, origin, current);

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({ pencilDraft: [[point.x, point.y, pressure]], penColour: lastColour });
    },
    [lastColour]
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        whiteboardState.mode !== WhiteBoardMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft === null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [whiteboardState.mode]
  );

  const insertPencil = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= 120) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(id, new LiveObject(penPathToLayer(pencilDraft, lastColour)));

      const liveLayersIds = storage.get("layerIds");
      liveLayersIds.push(id);

      setMyPresence({ pencilDraft: null });
      setWhiteboardState({ mode: WhiteBoardMode.Pencil });
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

      if (whiteboardState.mode === WhiteBoardMode.Pressing) {
        selectMultipleLayers(current, whiteboardState.origin);
      } else if (whiteboardState.mode === WhiteBoardMode.SelectionNet) {
        updateSelectionNet(current, whiteboardState.origin);
      } else if (whiteboardState.mode === WhiteBoardMode.Translating) {
        translateLayers(current);
      } else if (whiteboardState.mode === WhiteBoardMode.Resizing) {
        resizeLayer(current);
      } else if (whiteboardState.mode === WhiteBoardMode.Pencil) {
        continueDrawing(current, e);
      }
    },
    [
      whiteboardState,
      resizeLayer,
      translateLayers,
      camera,
      continueDrawing,
      selectMultipleLayers,
      updateSelectionNet,
    ]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToWhiteboardPoint(e, camera);

      if (
        whiteboardState.mode === WhiteBoardMode.None ||
        whiteboardState.mode === WhiteBoardMode.Pressing
      ) {
        unselectLayer();
        setWhiteboardState({ mode: WhiteBoardMode.None });
      } else if (whiteboardState.mode === WhiteBoardMode.Pencil) {
        insertPencil();
      } else if (whiteboardState.mode === WhiteBoardMode.Inserting) {
        insertLayer(whiteboardState.layerType, point);
      } else {
        setWhiteboardState({
          mode: WhiteBoardMode.None,
        });
      }

      history.resume();
    },
    [
      camera,
      whiteboardState,
      setWhiteboardState,
      history,
      insertLayer,
      translateLayers,
      unselectLayer,
      insertPencil,
    ]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToWhiteboardPoint(e, camera);

      if (whiteboardState.mode === WhiteBoardMode.Inserting) {
        return;
      }

      if (whiteboardState.mode === WhiteBoardMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setWhiteboardState({ origin: point, mode: WhiteBoardMode.Pressing });
    },
    [whiteboardState, setWhiteboardState, camera, startDrawing]
  );

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        whiteboardState.mode === WhiteBoardMode.Pencil ||
        whiteboardState.mode === WhiteBoardMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToWhiteboardPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setWhiteboardState({ mode: WhiteBoardMode.Translating, current: point });
    },
    [setWhiteboardState, camera, history, whiteboardState.mode]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setWhiteboardState({
        mode: WhiteBoardMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  const selections = useOthersMapped((id) => id.presence.selection);
  const layerIdsToColour = useMemo(() => {
    const layerIdsToColour: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColour[layerId] = randomColourToId(connectionId);
      }
    }

    return layerIdsToColour;
  }, [selections]);

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
      <LayerTools camera={camera} setLastColour={setLastColour} />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColour={layerIdsToColour[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {whiteboardState.mode === WhiteBoardMode.SelectionNet &&
            whiteboardState.current != null && (
              <rect
                className="fill-sky-200/5 stroke-sky-200 stroke-1"
                x={Math.min(whiteboardState.origin.x, whiteboardState.current.x)}
                y={Math.min(whiteboardState.origin.y, whiteboardState.current.y)}
                width={Math.abs(whiteboardState.origin.x - whiteboardState.current.x)}
                height={Math.abs(whiteboardState.origin.y - whiteboardState.current.y)}
              />
            )}
          <CursorPresence />
          {pencilDraft !== null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={rgbHex(lastColour.r, lastColour.g, lastColour.b)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};
