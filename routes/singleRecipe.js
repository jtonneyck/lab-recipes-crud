const express = require("express")
const app = express()
const Recipe = require("../models/recipe")


// QUERY METHOD
app.get("/recipes:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then(result => {
            debugger
            res.render("recipes/singleRecipe", { recipe: result })
        })
        .catch(err => console.log(err))
})

module.exports = app