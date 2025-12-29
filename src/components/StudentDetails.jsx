import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDetails() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    school: "",
    standard: "",
    roll: "",
    topic: "", // ✅ added
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
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

        {/* ✅ Topic selector */}
        <select name="topic" onChange={handleChange}>
          <option value="">Select Topic</option>
          <option value="AI">Science</option>
          <option value="Math">Math</option>
          <option value="History">History</option>
          <option value="General">General</option>
        </select>

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
}

export default StudentDetails;
