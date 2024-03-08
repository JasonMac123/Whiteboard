import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";

export const NoOrganization = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/images/team.png" alt="empty" height={400} width={400} />
      <Link
        href="https://www.flaticon.com/free-icons/team"
        className="text-xs text-muted-foreground text-neutral-700"
      >
        @Icon created by Freepik - Flaticon
      </Link>
      <h2 className="text-3xl font-semibold mt-6">Welcome to Whiteboard</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
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
