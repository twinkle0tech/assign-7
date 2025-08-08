const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let todos = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', { todos });
});
app.post('/add', (req, res) => {
    const { task, priority } = req.body;
    if (!task.trim()) {
        return res.send('<script>alert("Task cannot be empty"); window.history.back();</script>');
    }
    todos.push({ id: Date.now(), task, priority });
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.redirect('/');
});


app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { newTask, newPriority } = req.body;
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, task:newTask, priority: newPriority };
        }
     return todo;
    });
    res.redirect('/');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
