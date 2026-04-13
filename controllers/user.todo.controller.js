const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../database/todos.json');

const readTodos = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const writeTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

const todoController = {
    getTodos: (req, res) => {
        try {
            const todos = readTodos();
            res.json(todos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    addTodo: (req, res) => {
        try {
            const todos = readTodos();
            const { title } = req.body;
            const newTodo = { id: todos.length + 1, title, completed: false };
            todos.push(newTodo);
            writeTodos(todos);
            res.status(201).json(newTodo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateTodo: (req, res) => {
        try {
            const todos = readTodos();
            const id = parseInt(req.params.id);
            const todo = todos.find(t => t.id === id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });

            todo.title = req.body.title ?? todo.title;
            todo.completed = req.body.completed ?? todo.completed;
            writeTodos(todos);
            res.json(todo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteTodo: (req, res) => {
        try {
            let todos = readTodos();
            const id = parseInt(req.params.id);
        
            const newTodos = todos.filter(t => t.id !== id);
        
            if (todos.length === newTodos.length) {
                return res.status(404).json({ error: 'Todo not found' });
            }
        
            writeTodos(newTodos);
        
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = todoController;