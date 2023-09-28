import React, { useEffect, useState } from "react";
import "./memory.css";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  const [board, setBoard] = useState(() =>
    shuffle([...TILE_COLORS, ...TILE_COLORS])
  );

  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    if (selectedTiles.length < 2) return;

    if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([]);
    } else {
      const timeOutId = setTimeout(() => setSelectedTiles([]), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [selectedTiles]);

  const selectTile = (index) => {
    if (
      selectedTiles.length >= 2 ||
      selectedTiles.includes(index) ||
      matchedTiles.includes(index)
    ) {
      return;
    }
    setSelectedTiles([...selectedTiles, index]);
  };

  const restartGame = () => {
    setBoard(() => shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setSelectedTiles([]);
    setMatchedTiles([]);
  };

  const isWin = matchedTiles.length === board.length;

  return (
    <>
      <h1>{isWin ? "You Win!" : "Memory"}</h1>
      <div className="board">
        {board.map((tileColor, index) => {
          const isTurnOver =
            selectedTiles.includes(index) || matchedTiles.includes(index);
          const className = isTurnOver ? `tile ${tileColor}` : "tile";
          return (
            <div
              key={index}
              className={className}
              onClick={() => selectTile(index)}
            ></div>
          );
        })}
      </div>
      {isWin ? <button onClick={restartGame}>Restart</button> : null}
    </>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
