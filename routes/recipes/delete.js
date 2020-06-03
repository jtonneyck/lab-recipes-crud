const express = require('express')
const app = express()
const Recipe = require("../../models/recipes.js");

app.get("/recipes/delete/", (req, res, next) => {
    let idToDeleteRecipe = req.query.id

    Recipe.findByIdAndDelete(idToDeleteRecipe)
        .then(() => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log("Error with deleting the recipe", error)
        })
})

module.exports = app