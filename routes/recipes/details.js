const express = require('express');
const app = express();
const Recipe = require("../../models/recipes.js");

app.get("/recipes/details/", (req, res, next) => {
    let idToLoad = req.query.id

    Recipe.findById(idToLoad)
        .then((recipes) => {
            res.render('details', { recipes: recipes })
        })
        .catch((error) => {
            console.log("Error with loading recipe details", error)
        })
})

module.exports = app;