"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";

interface WhiteBoardRoomProps {
  children: ReactNode;
  roomId: string;
}

export const WhiteBoardRoom = ({ children, roomId }: WhiteBoardRoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div></div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
