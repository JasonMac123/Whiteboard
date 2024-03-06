"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "./empty-state";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];

  if (!data.length && query.search) {
    return (
      <EmptyState
        image={"/images/magnifying-glass.png"}
        altImage="image of magnifying-glass"
        attributionLink="https://www.flaticon.com/free-icons/magnifying-glass"
        error="No searchs found"
        errorMessage="Try searching using another term"
      />
    );
  }

  if (!data.length && query.favourites) {
    return (
      <EmptyState
        image={"/images/star.png"}
        altImage="image of star"
        attributionLink="https://www.flaticon.com/free-icons/star"
        error="No favourites"
        errorMessage="Favourite a board first!"
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        image={"/images/noticeboard.png"}
        altImage="Image of organized sticky notes"
        attributionLink="https://www.flaticon.com/free-icons/sticky-notes"
        error="No boards"
        errorMessage="Create a board first!"
      >
        <div className="mt-6">
          <Button size="lg">Create a board!</Button>
        </div>
      </EmptyState>
    );
  }

  return <div></div>;
};
