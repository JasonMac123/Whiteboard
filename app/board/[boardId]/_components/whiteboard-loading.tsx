import { Loader2 } from "lucide-react";

import { BoardInfoSkeleton } from "./board-info";
import { BoardMembersSkeleton } from "./board-members";
import { ToolKitSkeleton } from "./board-layout/tool-kit/index";

export const WhiteBoardLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <BoardInfoSkeleton />
      <BoardMembersSkeleton />
      <ToolKitSkeleton />
    </main>
  );
};
