import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TIME_LIMIT = 10; // seconds

function QuizPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const student = state?.student;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  /* ----------------------------
     Redirect if no student
  ---------------------------- */
  useEffect(() => {
    if (!student) navigate("/");
  }, [student, navigate]);

  /* ----------------------------
     Fetch Questions
  ---------------------------- */
  useEffect(() => {
    fetch(
      `http://localhost:3000/get-questions?topic=${encodeURIComponent(
        student.topic
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);
        setQuestions(data.questions || []);
      });
  }, []);

  /* ----------------------------
     Timer Logic
  ---------------------------- */
  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft === 0) {
      handleSubmit(null); // ⏰ auto submit (timeout)
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, questions]);

  /* ----------------------------
     Submit Answer
  ---------------------------- */
  const handleSubmit = (choice) => {
    const correct = questions[current].correctAnswer;

    const nextScore =
      choice && choice === correct ? score + 1 : score;

    setScore(nextScore);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      navigate("/certificate", {
        state: {
          student,
          score: nextScore,
          total: questions.length,
        },
      });
    }
  };

  /* ----------------------------
     UI Guards
  ---------------------------- */
  if (!questions.length) return <p>Loading questions...</p>;

  const q = questions[current];

  return (
    <div className="page-card">
      <h2>
        Question {current + 1} / {questions.length}
      </h2>

      <div className="timer">
        ⏳ Time Left: <b>{timeLeft}s</b>
      </div>

      <p className="quiz-question">{q.question}</p>

      {/* MCQ OPTIONS */}
      <div className="options">
  {Object.entries(q.options).map(([key, value]) => (
    <div
      key={key}
      className={`option-box ${selected === key ? "selected" : ""}`}
      onClick={() => setSelected(key)}
    >
      <input
        type="radio"
        checked={selected === key}
        readOnly
      />

      <div className="option-text">
        <span className="option-key">{key}.</span>
        <span className="option-value">{value}</span>
      </div>
    </div>
  ))}
</div>


      <button
        disabled={!selected}
        onClick={() => handleSubmit(selected)}
      >
        Submit
      </button>

      <div className="score">
        Score: {score}
      </div>
    </div>
  );
}

export default QuizPage;


