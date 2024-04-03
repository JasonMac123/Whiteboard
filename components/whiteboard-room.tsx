"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";

import { Layer } from "@/types/layer";

interface WhiteBoardRoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const WhiteBoardRoom = ({ children, roomId, fallback }: WhiteBoardRoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [], pencilDraft: null, penColour: null }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};
