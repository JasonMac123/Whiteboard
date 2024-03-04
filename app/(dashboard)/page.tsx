"use client";

import { useOrganization } from "@clerk/nextjs";

import { Empty } from "./_components/empty";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)]">
      {!organization ? <Empty /> : <BoardList />}
    </div>
  );
};

export default DashboardPage;
