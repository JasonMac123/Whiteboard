"use client";

import { useOrganization } from "@clerk/nextjs";

import { BoardList } from "./_components/board/board-list";
import { NoOrganization } from "./_components/board/no-organization";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favourites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)]">
      {!organization ? (
        <NoOrganization />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
