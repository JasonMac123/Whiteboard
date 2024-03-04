"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { HoverHint } from "@/components/hover-hint";

interface OrganizationIconProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const OrganizationIcon = ({
  id,
  name,
  imageUrl,
}: OrganizationIconProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <HoverHint label={name} side="right" sideOffset={20}>
        <Image
          src={imageUrl}
          onClick={onClick}
          alt={name}
          fill
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </HoverHint>
    </div>
  );
};
