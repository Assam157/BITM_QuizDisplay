import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const student = state?.student;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!student) navigate("/");
  }, [student, navigate]);

  useEffect(() => {
    fetch(
  `http://localhost:3000/get-questions?topic=${encodeURIComponent(student.topic)}`
)
      .then((res) => res.json())
        .then(data => {
          console.log("API RESPONSE:", data); // 👈 ADD THIS
          setQuestions(data.questions);       // ✅ FIX
  })
  }, []);

  const submitAnswer = () => {
    if (!answer) return;

    const correctAnswer =
      questions[current].answer.trim().toLowerCase();

    const isCorrect =
      answer.trim().toLowerCase() === correctAnswer;

    // ✅ compute next score synchronously
    const nextScore = isCorrect ? score + 1 : score;

    setScore(nextScore);
    setAnswer("");

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      // ✅ pass the CORRECT final score
      navigate("/certificate", {
        state: {
          student,
          score: nextScore,
          total: questions.length,
        },
      });
    }
  };

  if (!questions.length) return <p>Loading questions...</p>;

  return (
    <div className="page-card">
      <h2>Question {current + 1}</h2>

      <p className="quiz-question">
        {questions[current].question}
      </p>

      <textarea
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={submitAnswer}>Submit</button>

      <div className="score">Score: {score}</div>
    </div>
  );
}

export default QuizPage;
