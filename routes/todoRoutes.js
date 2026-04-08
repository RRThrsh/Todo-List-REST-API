const express = require('express');
const router = express.Router();
const todoController = require('../controllers/user.todo.controller');
const validateTodo = require('../middleware/validateTodo');

// Routes
router.get('/', todoController.getTodos);
router.post('/', validateTodo, todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;