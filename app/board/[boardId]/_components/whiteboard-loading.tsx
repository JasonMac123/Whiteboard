import { Loader2 } from "lucide-react";

import { BoardInfo } from "./board-info";
import { BoardMembers } from "./board-members";
import { ToolKit } from "./tool-kit";

export const WhiteBoardLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <BoardInfo.Skeleton />
      <BoardMembers.Skeleton />
      <ToolKit.Skeleton />
    </main>
  );
};
