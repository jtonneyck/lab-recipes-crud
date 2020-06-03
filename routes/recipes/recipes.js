const express = require('express');
const app = express();
const Recipe = require("../../models/recipes.js");

app.get("/recipes", (req, res, next) => {
    Recipe.find({})
        .then((recipes) => {
            res.render('recipes', { recipes: recipes });
        })
        .catch((error) => {
            console.log("Error with loading recipes", error)
        })
})

module.exports = app;