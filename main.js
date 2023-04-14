const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('<h1>This is Home Page</h1>')
})
//######################### fake dataBase ##############################
const d = new Date();
let text = d.toString();

let todo_list = [
    {
        id: uuid(),
        Title: 'eat',
        Description: 'eating lunch!',
        Completed: false,
        CreatedAT: text
    },
    {
        id: uuid(),
        Title: 'walk a dog',
        Description: 'Helping take care of my friend"s dog',
        Completed: false,
        CreatedAT: text
    },
    {
        id: uuid(),
        Title: 'swim',
        Description: 'Go to swimming pool this afternoon',
        Completed: false,
        CreatedAT: text
    },
    {
        id: uuid(),
        Title: 'workout',
        Description: 'Play basketball with college friends',
        Completed: false,
        CreatedAT: text
    }
]
//######################### fake data ##############################
app.get('/Todos', (req, res) => {
    res.render('comments/comments.ejs', { todo_list })
})
app.get('/Todos/new', (req, res) => {
    res.render('comments/new.ejs')
})
app.post('/Todos', (req, res) => {
    const { title, description, completed_status } = req.body
    const d = new Date();
    const text = d.toString();
    todo_list.push({
        id: uuid(),
        Title: title,
        Description: description,
        Completed: completed_status,
        CreatedAT: text
    })
    res.redirect('/Todos');
})

app.get('/Todos/:id', (req, res) => {
    const { id } = req.params
    const todo = todo_list.find((todo) => todo.id === (id));
    res.render('comments/show.ejs', { todo })
})

app.patch('/Todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todo_list.find(todo => todo.id === id);
    const { completed_status, description } = req.body;
    todo.Completed = completed_status;
    todo.Description = description;
    res.redirect('/Todos');
})

app.get('/Todos/:id/edit', (req, res) => {
    const { id } = req.params;
    const todo = todo_list.find((todo) => todo.id === (id));
    console.log(todo)
    res.render('comments/edit.ejs', { todo });
})

app.delete('/Todos/:id', (req, res) => {
    const { id } = req.params;
    todo_list = todo_list.filter((todo) => todo.id !== (id));
    res.redirect('/Todos');
})

app.listen(3000, () => {
    console.log('Port 3000 in Listening!!');
})