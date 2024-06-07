import React from "react";

interface Props {
  params: { id: string };
}

const GamePage = ({ params }: Props) => {
  return <div>{`page for game with id ${params.id}`}</div>;
};

export default GamePage;
