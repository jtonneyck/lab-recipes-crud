const express = require("express")
const app = express()
const Recipe = require("../models/recipe")


// QUERY METHOD
app.get("/recipes/:id", (req, res) => {
    Recipe.find({ id: req.query.id })
        .then((result) => {
            debugger
            for (let i = 0; i < result.length; i++) {
                res.render("recipes/singleRecipe", { recipe: result[i] })
                console.log(i)
            }
        })
        .catch(err => console.log(err))
})



module.exports = app