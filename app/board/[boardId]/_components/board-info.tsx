import { Skeleton } from "@/components/ui/skeleton";

export const BoardInfo = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md"></div>
  );
};

BoardInfo.Skeleton = function BoardInfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[250px]" />
  );
};
