import { useState, useEffect } from "react";
import "./App.css";
import { questionsData, submissionData } from "./data";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [questions, submissions] = useQuestionsAndSubmissions();
  const questionByCategories = getQuestionsByCategories(questions);
  const submissionsByQuestion = getSubmissionByQuestion(submissions);
  const keysCategory = Object.keys(questionByCategories);

  return (
    <>
      {keysCategory.map((category) => (
        <Category
          key={category}
          category={category}
          questions={questionByCategories[category]}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </>
  );
}

function Category({ category, questions, submissionsByQuestion }) {
  console.log(submissionsByQuestion);
  const r = questions.reduce((acc, curr) => {
    return submissionsByQuestion[curr.id] === "CORRECT" ? acc + 1 : acc;
  }, 0);
  console.log("r=", r);
  return (
    <div className="category">
      <h2>
        {category} {r} / {questions.length}
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </div>
  );
}

function Question({ question, submissionsByQuestion }) {
  const submissionQuestionStatus = submissionsByQuestion[question.id];
  const status = !submissionQuestionStatus
    ? "unattemped"
    : submissionQuestionStatus.toLowerCase().replace("_", "-");
  return (
    <div className="question">
      <div className={`status ${status}`}></div>
      <h3>{question.name}</h3>
    </div>
  );
}

const getQuestionsByCategories = (questions) => {
  const categories = {};
  questions.forEach((element) => {
    if (categories.hasOwnProperty(element.category)) {
      categories[element.category].push(element);
    } else {
      categories[element.category] = [];
    }
  });

  return categories;
};

const getSubmissionByQuestion = (submissions) => {
  const submissionByQuestion = {};
  submissions.forEach(({ questionId, status }) => {
    submissionByQuestion[questionId] = status;
  });

  return submissionByQuestion;
};

function useQuestionsAndSubmissions() {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchQuestAndSub() {
      try {
        // const [questionsResponse, submissionresponse] = await Promise.all([
        //   fetch(QUESTIONS_API_BASE_URL),
        //   fetch(SUBMISSIONS_API_BASE_URL),
        // ]);

        // const [questionsJson, submissionsJson] = await Promise.all([
        //   questionsResponse.json(),
        //   submissionresponse.json(),
        // ]);

        setQuestions(questionsData);
        setSubmissions(submissionData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchQuestAndSub();
  }, []);

  return [questions, submissions];
}
