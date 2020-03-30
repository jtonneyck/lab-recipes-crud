const express = require("express");
const app = express();
const Recipe = require("../models/recipe");


app.get("/recipes/:recipeId", (req, res) => {
    Recipe.findById(req.params.recipeId)
    .then(dataRecipe =>{
        res.render("recipes/oneRecipe", {recipe: dataRecipe})
    })
    .catch(err => console.log(err));
});

module.exports = app;