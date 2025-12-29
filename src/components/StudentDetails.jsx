 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDetails() {
  const navigate = useNavigate();

  // ✅ Central topic list
  const topics = [
    "General",
    "Robotics",
    "AI",
    "WebDevelopment",
    "EmbeddedSystems",
    "Other",
  ];

  const [student, setStudent] = useState({
    name: "",
    school: "",
    standard: "",
    roll: "",
    topic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startQuiz = () => {
    if (Object.values(student).some((v) => !v)) {
      alert("Please fill all details");
      return;
    }

    navigate("/quiz", { state: { student } });
  };

  return (
    <div className="page-card">
      <div className="form-container">
        <h2>Student Details</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="school"
          placeholder="School"
          onChange={handleChange}
        />

        <input
          name="standard"
          placeholder="Standard"
          onChange={handleChange}
        />

        <input
          name="roll"
          placeholder="Roll No"
          onChange={handleChange}
        />

        {/* ✅ SIMPLE TOPIC DROPDOWN */}
        <select
          name="topic"
          value={student.topic}
          onChange={handleChange}
        >
          <option value="">Select Topic</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
}

export default StudentDetails;


