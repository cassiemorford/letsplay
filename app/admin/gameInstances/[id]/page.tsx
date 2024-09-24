import OrgSearchBar from "@/components/OrgSearchBar";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const GameInstancePage = async ({ params }: Props) => {
  const gameInstance = await prisma.gameInstance.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      borrower: true,
    },
  });

  if (!gameInstance) {
    return <p>Game Instance not found</p>;
  }
  return (
    <div>
      <p>{`current borrower: ${gameInstance.borrower.name}`}</p>

      <OrgSearchBar gameInstance={gameInstance} />
    </div>
  );
};

export default GameInstancePage;
