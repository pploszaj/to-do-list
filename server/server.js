#!/usr/bin/env node


const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const UserController = require('./userController')
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
app.use(cookieParser());


app.use(express.json());
app.use(urlencoded());



app.post('/api/signup', UserController.verifyUser, UserController.createUser, (req,res) => {
    res.status(200).send('hello this works');
})

app.post('/api/login', UserController.loginUser, UserController.setCookie, (req,res) => {
    console.log('back in the router')
    res.status(200).send(res.locals.lists);
})

app.patch('/api/list', UserController.addList, (req,res) => {
    res.status(200).json(res.locals.new)
})

app.patch('/api/todos/todo/:name', UserController.addTodo, (req,res) => {
    console.log('yess we made it back in the router woohoo')
})

app.get('/api/todos/list/:name', UserController.getTodos, (req,res) => {
    console.log('back in the get router')
    console.log('here is the list of todos which should be empty', res.locals.list)
    res.status(200).json(res.locals.list);
})

app.get('/', (req,res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})


app.use((err,req,res,next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {err: 'An error occurred'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})