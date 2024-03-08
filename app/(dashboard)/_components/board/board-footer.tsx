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
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {dateLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absoolute top-3 right-3 text-muted-foreground hover:text-yellow-600",
          favourite && "fill-yellow-600 text-yellow-600"
        )}
      >
        <Star />
      </button>
    </div>
  );
};
