"use client";

import { LucideIcon } from "lucide-react";

import { HoverHint } from "@/components/hover-hint";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  active,
  disabled,
}: ToolButtonProps) => {
  return (
    <HoverHint label={label} side="right" sideOffset={12}>
      <Button
        disabled={disabled}
        onClick={onClick}
        size="icon"
        variant={active ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </HoverHint>
  );
};
