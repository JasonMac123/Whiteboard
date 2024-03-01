"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { OrganizationSwitcher } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href={"/"}>
        <div className="flex items-center gap-x-2">
          <Image
            src={"../../../public/WhiteBoard.png"}
            alt="Logo"
            height={60}
            width={60}
          />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Whiteboard
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
    </div>
  );
};
