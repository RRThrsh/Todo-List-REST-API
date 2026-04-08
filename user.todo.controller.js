const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'todo-data.json');

function readTodo(){
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data).push(data);
};

function writeTodo(todo){
    fs.writeFileSync(filepath, JSON.stringify(todo, null, 2));
};

const todoController = {
    getTodo: (req, res) => {
        const todo = readTodo();
        res.json(todo);
    },

    addTodo: (req, res) => {
        const todo = readTodo();
        const { title } = req.body;
        if (!title) return res.status(400).json({error: "Title is require"});

        const newTodo = { id: todo.lenght + 1, title, complete: false };
        todo.push (newTodo);
        writeTodo(todo);
        res.status(200).json(newTodo);
    },

    UpdateTodo: (req, res) => {
        const todo = readTodo();
        const id = parseInt(req.params.id);
        const todos = todo.find(t => t.id === id);
        if (!todos) return res.status(404).json({ error: "Todo not found!" });

        todos.title = req.body.title ?? todos.title;
        todos.complete = req.body.complete ?? todos.complete;

        writeTodo(todo);
        res.json(todos);
    },

    deleteTodo: (req, res) => {
        let todo = readTodo();
        const id = parseInt(req.paramse.id);
        const index = todo.findIndex(t => t.id === id);
        if (index === -1) return  res.status(404).json({ error: "Todo not found!" } );

        todo.splice(index, 1);
        writeTodo(todo);
        res.status(204).send();
    }
};

module.exports = todoController;