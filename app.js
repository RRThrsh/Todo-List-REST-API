const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/todos', todoRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));