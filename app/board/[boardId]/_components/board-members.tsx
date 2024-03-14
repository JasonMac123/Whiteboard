import { Skeleton } from "@/components/ui/skeleton";

export const BoardMembers = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"></div>
  );
};

BoardMembers.Skeleton = function BoardMembersSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[200px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
