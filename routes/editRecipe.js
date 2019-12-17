const express = require("express");
const app = express();
//const mongoose = require("mongoose)")
const Recipe = require("../models/Recipe");

//GET method + PARAMS
app.get("/edit/:id", (req, res) => {
    let recipeId = req.params.id
    Recipe.findById(recipeId)
        .then((recipe) => {
            res.render("recipes/editRecipe.hbs", { recipe: recipe })
        })
        .catch(err => console.log((err)))
})

//POST method 


app.post("/edit/:id", (req, res) => {
    let recipeId = req.params.id
    let editRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration
    }

    Recipe.findByIdAndUpdate(recipeId, editRecipe, {new:true})
    .then((newRecipe) => {
        res.redirect(`/detailedRecipe?id=${newRecipe.id}`)
    })
    .catch(err => console.log(err))
})

module.exports = app