import { WhiteBoard } from "./_components/whiteboard";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return <WhiteBoard boardId={params.boardId} />;
};

export default BoardIdPage;
