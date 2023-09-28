import React, { useState, useEffect } from "react";
import { questionsArr, submissionsArr } from "./questions";
const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [questions, submissions] = useQetQuestionAnsSubmissions();

  const questionByCategory = getQuestionByCategory(questions);
  const submissionByQuestion = getSubmissionsByCategory(submissions);

  const categoryKeys = Object.keys(questionByCategory);
  return (
    <>
      {categoryKeys.map((category) => {
        const correctCretionCount = getCorretQuestionByCategory(
          submissionByQuestion,
          questionByCategory[category]
        );
        return (
          <div key={category} className="category">
            <h2>
              {category} - {correctCretionCount} /{" "}
              {questionByCategory[category].length}
            </h2>

            {questionByCategory[category].map((question) => {
              const submissionStatus = submissionByQuestion[question.id];
              const statusClasss =
                submissionStatus == null
                  ? "unattemped"
                  : submissionStatus.toLowerCase().replace("_", "-");

              console.log("statusClasss", statusClasss);

              const el = (
                <div key={question.id} className="question">
                  <div className={`status ${statusClasss}`}>
                    <h3>{question.name}</h3>
                  </div>
                </div>
              );

              console.log(el);
              return (
                <div key={question.id} className="question">
                  <div className={"`status ${statusClasss}`"}>
                    <h3>{question.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function Category({ category }) {
  console.log("category=", category);
  return null;
}

function getCorretQuestionByCategory(submissionByQuestion, questions) {
  let count = 0;
  questions.forEach((item) => {
    if (submissionByQuestion[item.id] === "CORRECT") {
      count++;
    }
  });

  return count;
}

function getQuestionByCategory(questions) {
  const categories = {};
  questions.forEach(({ category, ...question }) => {
    if (!categories.hasOwnProperty(category)) {
      categories[category] = [];
    }

    categories[category].push(question);
  });

  return categories;
}

function getSubmissionsByCategory(submissions) {
  const submissionsByQuestion = {};

  submissions.forEach(({ questionId, status }) => {
    submissionsByQuestion[questionId] = status;
  });

  return submissionsByQuestion;
}

function useQetQuestionAnsSubmissions() {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fecthData() {
      //   const [questionsResponse, submissionsResponse] = await Promise.all([
      //     fetch(QUESTIONS_API_BASE_URL),
      //     fetch(SUBMISSIONS_API_BASE_URL),
      //   ]);
      //   const [questionJson, submissionsJson] = await Promise.all([
      //     questionsResponse.json(),
      //     submissionsResponse.json(),
      //   ]);
      setQuestions(questionsArr);
      setSubmissions(submissionsArr);
    }

    fecthData();
  }, []);

  return [questions, submissions];
}
