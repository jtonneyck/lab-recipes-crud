const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get('/recipe/difficulty', (req, res) => {
    let difficulty = req.query.level;
    Recipe.find(
        {level: {$in: difficulty}}
    )
    .then(recipes => {
        res.render('recipes/difficulty',{recipes: recipes});
    })
    .catch((err) => {
        console.log("Err",err)
    })
});

module.exports = app;
