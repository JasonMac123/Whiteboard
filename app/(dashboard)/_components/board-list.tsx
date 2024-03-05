"use client";

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
        attributionLink="https://www.flaticon.com/free-icons/star"
        error="No favourites"
        errorMessage="Favourite a board first!"
      />
    );
  }

  if (!data.length) {
    return <div>No boards</div>;
  }

  return <div></div>;
};
