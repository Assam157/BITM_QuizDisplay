import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CertificatePage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const { student, score, total } = state;

  return (
    <div className="certificate">
      <h1>Certificate of Achievement</h1>

      <p>This certifies that</p>
      <h2>{student.name}</h2>

      <p>
        from <strong>{student.school}</strong>, Standard{" "}
        <strong>{student.standard}</strong> (Roll No:{" "}
        <strong>{student.roll}</strong>)
      </p>

      <p>has successfully completed the trivia quiz.</p>

      <h3>
        Score: {score} / {total}
      </h3>

      <p className="footer">Trivia App</p>
    </div>
 
  );
}

export default CertificatePage;
