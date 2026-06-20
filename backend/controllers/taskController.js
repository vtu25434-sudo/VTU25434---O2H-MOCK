const db = require('../config/db');

// GET
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// POST
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (!title || description.length < 20) {
    return res.status(400).json({ message: "Validation error" });
  }

  const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
  db.query(sql, [title, description, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task created" });
  });
};

// PUT
// ✅ FULL UPDATE (FIXED)
exports.updateTask = (req, res) => {
  const { title, description, status } = req.body;

  const sql = `
    UPDATE tasks 
    SET title=?, description=?, status=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [title, description, status, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Update failed");
      }
      res.send("Task updated successfully");
    }
  );
};

// DELETE
exports.deleteTask = (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};