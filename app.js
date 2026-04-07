const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log("A visitor came to page!");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000);