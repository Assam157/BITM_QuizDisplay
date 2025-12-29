import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDetails from "./components/StudentDetails";
import QuizPage from "./components/QuizPage";
import CertificatePage from "./components/CertificatePage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<StudentDetails />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
