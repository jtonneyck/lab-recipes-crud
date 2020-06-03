const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get("/recipe/details", (req, res) => {
    let objectId = req.query.id
    Recipe.findById(objectId)
      .then((recipe) => {
        res.render("recipes/recipeDetails", {recipe: recipe});
      })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = app;
