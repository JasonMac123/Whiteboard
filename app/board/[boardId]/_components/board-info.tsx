"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameDialog } from "@/store/rename-dialog";

import { Button } from "@/components/ui/button";
import { HoverHint } from "@/components/hover-hint";

interface BoardInfoProps {
  boardId: string;
}

const TabSeperator = () => {
  return <div className="text-neutral-300 px-2">|</div>;
};

export const BoardInfo = ({ boardId }: BoardInfoProps) => {
  const { onOpen } = useRenameDialog();

  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) {
    return <BoardInfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <HoverHint label="Go back to homepage" side="bottom" sideOffset={12}>
        <Button asChild className="px-2" variant={"board"}>
          <Link href={"/"}>
            <Image
              src={"/images/WhiteBoard.png"}
              alt="Logo"
              height={50}
              width={50}
            />
            <span className="font-semibold text-xl ml-2 text-black">
              WhiteBoard
            </span>
          </Link>
        </Button>
      </HoverHint>
      <TabSeperator />
      <Button
        variant={"board"}
        className="text-base font-normal px-2"
        onClick={() => onOpen(data._id, data.title)}
      >
        {data.title}
      </Button>
    </div>
  );
};

export const BoardInfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[250px]" />
  );
};
