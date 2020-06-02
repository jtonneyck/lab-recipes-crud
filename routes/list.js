const express = require("express");
const app = express();
const Recipe = require("../models/Recipe.model");

app.get('/', (req, res) => {
    Recipe
    .find({})
    .then(recipes => {
      res.render('recipes/list',{recipes: recipes});
    });
  })
  

module.exports = app;
