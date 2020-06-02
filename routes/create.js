const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.post("/recipe/create", (req, res) => {
    let newRecipe = req.body;
    Recipe.create(newRecipe)
      .then((newRecipe) => {
        res.redirect(`/recipe/details?id=${newRecipe._id}`);
      })
      .catch((err) => {
        console.log("Err",err)
      })
})

app.get("/recipe/create", (req,res) => {
    res.render("recipes/createRecipes")
})

module.exports = app;