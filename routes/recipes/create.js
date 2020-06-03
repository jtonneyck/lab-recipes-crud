const express = require('express')
const app = express()
const Recipe = require("../../models/recipes.js");

app.get("/recipes/create", (req, res, next) => {
    res.render('create');
})

app.post("/recipes/create", (req, res, next) => {
    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then(recipes => {
            res.redirect(`/recipes/details/?id=${recipes._id}`);
        })
        .catch(error => {
            console.log("Recipe did not got added because of an error", error)
        })
})

module.exports = app;