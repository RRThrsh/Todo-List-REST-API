const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'todos.json');

function readTodos() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function writeTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

const todoController = {
    getTodos: (req, res) => {
        const todos = readTodos();
        res.json(todos);
    },

    addTodo: (req, res) => {
        const todos = readTodos();
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const newTodo = { id: todos.length + 1, title, completed: false };
        todos.push(newTodo);
        writeTodos(todos);
        res.status(201).json(newTodo);
    },

    updateTodo: (req, res) => {
        const todos = readTodos();
        const id = parseInt(req.params.id);
        const todo = todos.find(t => t.id === id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        todo.title = req.body.title ?? todo.title;
        todo.completed = req.body.completed ?? todo.completed;

        writeTodos(todos);
        res.json(todo);
    },

    deleteTodo: (req, res) => {
        let todos = readTodos();
        const id = parseInt(req.params.id);
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) return res.status(404).json({ error: "Todo not found" });

        todos.splice(index, 1);
        writeTodos(todos);
        res.status(204).send();
    }
};

module.exports = todoController;