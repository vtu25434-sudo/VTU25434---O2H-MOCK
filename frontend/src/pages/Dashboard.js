import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
      setLoading(false);
    } catch {
      toast.error("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // COMPLETE TASK
  const handleComplete = async (id) => {
    try {
      await API.put(`/${id}`, { status: "Completed" });
      toast.success("Task Completed ✅");
      fetchTasks();
    } catch {
      toast.error("Error updating task");
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      toast.success("Task Deleted 🗑️");
      fetchTasks();
    } catch {
      toast.error("Error deleting task");
    }
  };

  // FILTER + SEARCH
  const filteredTasks = tasks
    .filter((t) =>
       (t.title || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filter === "All" ? true : t.status === filter
    );

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">🚀 Task Dashboard</h2>

      {/* STATS */}
      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="text-muted">Total Tasks</h6>
            <h2 className="fw-bold text-primary">{tasks.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="text-muted">Completed</h6>
            <h2 className="fw-bold text-success">
              {tasks.filter(t => t.status === "Completed").length}
            </h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="text-muted">Pending</h6>
            <h2 className="fw-bold text-warning">
              {tasks.filter(t => t.status !== "Completed").length}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          className="form-control w-50"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="form-select w-25"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">📭 No tasks yet</h4>
          <p className="text-muted">Start by adding a new task</p>
        </div>
      ) : (
        <div className="row">
          {filteredTasks.map((task) => (
            <div className="col-md-4 mb-4" key={task.id}>
              <div className="card shadow-sm border-0 p-3 h-100">

                {/* TITLE + STATUS */}
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">{task.title}</h5>

                  <span className={
                    task.status === "Completed"
                      ? "badge bg-success"
                      : task.status === "Pending"
                      ? "badge bg-warning text-dark"
                      : "badge bg-primary"
                  }>
                    {task.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-muted mt-2">{task.description}</p>

                {/* DATE */}
                <small className="text-secondary">
                  📅 {new Date(task.created_at).toLocaleDateString()}
                </small>

                {/* ACTIONS */}
                <div className="mt-3 d-flex justify-content-between">

                  <button
                    className="btn btn-outline-success btn-sm"
                    disabled={task.status === "Completed"}
                    onClick={() => handleComplete(task.id)}
                  >
                    ✔
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;