import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dark, setDark] = useState(false);

  // Apply dark mode to body
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <BrowserRouter>

      {/* 🔥 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container d-flex justify-content-between">

          {/* Logo */}
          <span className="navbar-brand fw-bold">TaskFlow 🚀</span>

          {/* Right Side */}
          <div className="d-flex align-items-center">

            <Link to="/" className="btn btn-outline-light me-2">
              Dashboard
            </Link>

            <Link to="/add" className="btn btn-primary me-3">
              + Add Task
            </Link>

            {/* 🌙 Dark Mode Toggle */}
            <button
              className="btn btn-light"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀️" : "🌙"}
            </button>

          </div>
        </div>
      </nav>

      {/* 🔥 MAIN CONTENT */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </div>

      {/* 🔥 TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
  );
}

export default App;