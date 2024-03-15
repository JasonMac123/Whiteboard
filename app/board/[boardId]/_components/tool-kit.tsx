import { Skeleton } from "@/components/ui/skeleton";

export const ToolKit = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white roudned-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Draw</div>
        <div>Create</div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

export const ToolKitSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[400px] w-[60px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};
