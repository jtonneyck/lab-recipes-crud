const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/detail", (req, res) => {
  const recipeId = req.query.id;

  console.log(recipeId);

  Recipe.findById(recipeId)
    .then((recipe) => {
      res.render("recipes/detail", { recipe: recipe });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
