const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

// ✅ clean routes
router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;