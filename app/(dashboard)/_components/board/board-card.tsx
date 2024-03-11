"use client";

import Image from "next/image";
import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { BoardFooter } from "./board-footer";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const dateLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <div className="opacity-0 group-hover:opacity-50 transition h-full w-full bg-black"></div>
        </div>
        <BoardFooter
          title={title}
          authorLabel={authorLabel}
          dateLabel={dateLabel}
          favourite={false}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};
