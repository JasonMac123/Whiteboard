"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface BoardFooterProps {
  title: string;
  authorLabel: string;
  dateLabel: string;
  favourite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const BoardFooter = ({
  title,
  authorLabel,
  dateLabel,
  favourite,
  onClick,
  disabled,
}: BoardFooterProps) => {
  return <div></div>;
};
