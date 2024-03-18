import { HoverHint } from "@/components/hover-hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
}

export const UserAvatar = ({ src, name, fallback }: UserAvatarProps) => {
  return (
    <HoverHint label={name || "Team Member"} side="bottom" sideOffset={12}>
      <Avatar className="h-8 w-8 border-2">
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </HoverHint>
  );
};
