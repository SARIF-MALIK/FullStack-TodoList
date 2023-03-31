var express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
var app = express()
 
app.use(express.json()); 
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected!'));
 
app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
const Todo = require('./models/Todo'); 

app.get('/todos', async(req, res)=>{
    const todos = await Todo.find(); 
    res.json(todos)
})

app.post('/todo/new', (req, res)=>{
    const todo = new Todo({
        text: req.body.text,
    })
    todo.save(); 
    res.json(todo); 
})

app.delete('/todo/delete/:id', async(req, res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result); 
})

app.get('/todo/complete/:id', async(req, res)=>{
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete; 
    todo.save(); 
    res.json(todo); 
})

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})

