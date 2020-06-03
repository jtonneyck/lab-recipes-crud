const express = require('express');
const  app = express();
const Recipe = require('../models/Recipe.model');

app.post('/create/add', (req, res)=> {
    debugger
    console.log(req.body)
    const newRecipe = req.body;
    Recipe.create(newRecipe)
    .then((recipe) => {
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
    })
});

app.get('/create', (req, res) => {
res.render('create')
});

module.exports = app