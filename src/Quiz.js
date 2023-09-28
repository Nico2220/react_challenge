import React, { useState, useEffect } from "react";
import { quizData } from "./quizData";
import "./quiz.css";
const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [ableTochoose, setAbleToChoose] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      // const responseData = await fetch(QUIZ_API_BASE_URL);
      // const responseJson = await responseData.json();
      setQuestions(quizData);
    }

    fetchQuiz();
  }, []);

  if (!questions.length) return null;

  const updateChosenAnswers = (questionIndex, answerIndex) => {
    const newChosenAnswers = [...chosenAnswers];
    newChosenAnswers[questionIndex] = answerIndex;
    setChosenAnswers(newChosenAnswers);
  };

  const singleQuestion = questions[questionIndex];

  return (
    <>
      <h1>{singleQuestion.question}</h1>
      {singleQuestion.answers.map((answer, answerIndex) => {
        const chosenAnswerIndex = chosenAnswers[questionIndex];

        let statusClass =
          chosenAnswerIndex === singleQuestion.correctAnswer
            ? "correct"
            : "incorrect";

        return (
          <h2
            className={`answer ${
              answerIndex === chosenAnswerIndex ? statusClass : ""
            }`}
            onClick={() => {
              if (chosenAnswerIndex != null) return;
              updateChosenAnswers(questionIndex, answerIndex);
            }}
          >
            {answer}
          </h2>
        );
      })}
      <button
        disabled={questionIndex === 0}
        onClick={() => setQuestionIndex(questionIndex - 1)}
      >
        Back
      </button>
      <button
        disabled={
          questionIndex === questions.length - 1 || chosenAnswers.length === 0
        }
        onClick={() => {
          setQuestionIndex(questionIndex + 1);
          setAbleToChoose(true);
        }}
      >
        Next
      </button>
    </>
  );
}
