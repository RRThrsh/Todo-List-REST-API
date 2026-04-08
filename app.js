const express = require('express');
const app = express();
const todoController = require('./user.todo.controller');

app.use(express.json());

app.use((req, res, next) => {
    console.log("A visitor came to page!");
    next();
});

app.get('/', (req, res) => res.send("Hello World!"));
app.get('/todos', todoController.getTodos);
app.post('/todos', todoController.addTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);


app.listen(3000, () => console.log('Server running on http://localhost:3000'));