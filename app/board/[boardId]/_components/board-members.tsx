"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";

import { Skeleton } from "@/components/ui/skeleton";

export const BoardMembers = () => {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, 4).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name || "T"}
            />
          );
        })}
      </div>
    </div>
  );
};

export const BoardMembersSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[200px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
