import { WhiteBoard } from "./_components/whiteboard";
import { WhiteBoardRoom } from "@/components/whiteboard-room";
import { WhiteBoardLoading } from "./_components/whiteboard-loading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <WhiteBoardRoom roomId={params.boardId} fallback={<WhiteBoardLoading />}>
      <WhiteBoard boardId={params.boardId} />
    </WhiteBoardRoom>
  );
};

export default BoardIdPage;
