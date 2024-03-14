import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export const WhiteBoardLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
    </main>
  );
};
