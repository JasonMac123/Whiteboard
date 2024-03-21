import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface BoardFooterProps {
  title: string;
  authorLabel: string;
  dateLabel: string;
  favourite: boolean;
  toggleFavourite: () => void;
  disabled: boolean;
}

export const BoardFooter = ({
  title,
  authorLabel,
  dateLabel,
  favourite,
  toggleFavourite,
  disabled,
}: BoardFooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFavourite();
  };

  return (
    <div className="relative bg-white p-4">
      <p className="text-lg truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground truncate">
        {authorLabel}, {dateLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-4 right-3 text-muted-foreground hover:text-yellow-600 fill-yellow-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-6 w-6",
            favourite && "fill-yellow-600 text-yellow-600"
          )}
        />
      </button>
    </div>
  );
};
