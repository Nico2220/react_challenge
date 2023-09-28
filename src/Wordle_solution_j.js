import React, { useEffect, useState } from "react";
import "./wordle.css";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

const wordList = ["Nicol", "phili", "techo"];

export default function Wordle() {
  const [word, setWord] = useState("");
  const [board, setBoard] = useState(new Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  useEffect(() => {
    async function fetchWords() {
      try {
        // const response = await fetch(WORD_LIST_API_URL);
        // const wordList = await response.json();
        generateRandomWord(wordList);
      } catch (err) {
        console.error(err);
      }
    }

    fetchWords();
  }, []);

  useEffect(() => {
    if (board.includes(word) || board[board.length - 1] !== "") return;

    function onKeyDown(event) {
      let newBoard = [...board];
      let keyClicked = event.key;

      setCurrentGuess((prevGuess) => {
        if (prevGuess.length < 5 && keyClicked.length === 1) {
          return prevGuess + keyClicked;
        } else if (keyClicked === "Backspace") {
          return prevGuess.slice(0, -1);
        } else if (keyClicked === "Enter" && prevGuess.length === 5) {
          newBoard[currentLine] = prevGuess;
          setCurrentLine(currentLine + 1);
          setBoard(newBoard);
          return "";
        }

        return prevGuess;
      });
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentLine]);

  function generateRandomWord(wordList) {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    setWord(wordList[randomIndex]);
  }

  return (
    <div className="board">
      {word.length
        ? board.map((line, idx) => (
            <Line
              key={idx}
              word={word}
              line={
                currentLine === idx ? currentGuess.padEnd(5) : line.padEnd(5)
              }
              shouldEvalClass={idx < currentLine}
            />
          ))
        : "LOADING"}
    </div>
  );
}

function Line({ line, word, shouldEvalClass }) {
  return (
    <div className="line">
      {line.split("").map((tile, indexTwo) => {
        let theClass = "tile";

        if (shouldEvalClass) {
          if (tile === word[indexTwo].toLowerCase()) {
            theClass += " correct";
          } else if (word.toLowerCase().includes(tile)) {
            theClass += " close";
          } else {
            theClass += " incorrect";
          }
        }
        return <Tile key={indexTwo} tile={tile} theClass={theClass} />;
      })}
    </div>
  );
}

function Tile({ tile, theClass }) {
  return <div className={theClass}>{tile}</div>;
}
