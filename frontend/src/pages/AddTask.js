import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    if (form.description.length < 20) {
      toast.error("Description must be at least 20 characters");
      return;
    }

    try {
      await API.post("/", form);
      toast.success("Task Added Successfully ✅");

      setForm({
        title: "",
        description: "",
        status: "Pending",
      });

      navigate("/"); // go back to dashboard
    } catch (err) {
      console.error(err);
      toast.error("Error adding task");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center mt-5">
    <div className="card shadow-lg p-4" style={{ width: "500px", borderRadius: "12px" }}>
      
      <h3 className="text-center mb-4">✨ Add New Task</h3>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            placeholder="Minimum 20 characters..."
            className="form-control"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-control"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
          </select>
        </div>

        <button className="btn btn-primary w-100">
          ➕ Add Task
        </button>

      </form>
    </div>
  </div>
);
}

export default AddTask;