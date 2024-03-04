import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";

export const Empty = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="" alt="empty" height={300} width={300} />
      <h2 className="text-3xl font-semibold mt-6">Welcome to Whiteboard</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create an Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[506px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
