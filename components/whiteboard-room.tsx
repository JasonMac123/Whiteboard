"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { WhiteBoardLoading } from "@/app/board/[boardId]/_components/whiteboard-loading";

interface WhiteBoardRoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const WhiteBoardRoom = ({
  children,
  roomId,
  fallback,
}: WhiteBoardRoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<WhiteBoardLoading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
