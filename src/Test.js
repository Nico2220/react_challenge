import { useState } from "react";

const actionType = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

function Test() {
  const [board, setBoard] = useState(
    new Array(2).fill(3).map(() => new Array(5).fill(8))
  );

  return <div>{JSON.stringify(board)}</div>;
}

export default Test;
