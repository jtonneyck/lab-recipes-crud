const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get('/recipe/search', (req, res) => {
    let searchTerm = String(req.query.search);
    Recipe.find(
        { $text: { $search: searchTerm}}
    )
    .then(recipes => {
        res.render('recipes/search',{recipes: recipes});
    })
    .catch((err) => {
        console.log("Err",err)
    })
});

module.exports = app;
