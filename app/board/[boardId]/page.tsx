import { WhiteBoard } from "./_components/whiteboard";
import { WhiteBoardRoom } from "@/components/whiteboard-room";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <WhiteBoardRoom roomId={params.boardId} fallback={<div></div>}>
      <WhiteBoard boardId={params.boardId} />
    </WhiteBoardRoom>
  );
};

export default BoardIdPage;
