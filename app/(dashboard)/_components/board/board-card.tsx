"use client";

import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";

import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { BoardFooter } from "./board-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionMenu } from "@/components/action-menu";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavourited: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavourited,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const dateLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: mutateFavourite, pending: pendingFavourite } = useApiMutation(
    api.board.favourite
  );
  const { mutate: mutateUnfavourite, pending: pendingUnfavourite } =
    useApiMutation(api.board.unfavourite);

  const toggleFavourite = () => {
    if (isFavourited) {
      mutateUnfavourite({ id: id as Id<"boards">, orgId }).catch(() => {
        toast.error("Failed to unfavourite");
      });
    } else {
      mutateFavourite({ id: id as Id<"boards">, orgId }).catch(() => {
        toast.error("Failed to favourite");
      });
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <div className="opacity-0 group-hover:opacity-50 transition h-full w-full bg-black"></div>
          <ActionMenu id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition" />
            </button>
          </ActionMenu>
        </div>
        <BoardFooter
          title={title}
          authorLabel={authorLabel}
          dateLabel={dateLabel}
          favourite={false}
          toggleFavourite={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
