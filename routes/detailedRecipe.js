const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");

app.get("/detailedRecipe", (req,res)=> {
    let recipeId = req.query.id
    Recipe.findById(recipeId)
        .then((recipe)=> {
            res.render("recipes/detailedRecipe.hbs", { recipe: recipe });
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app