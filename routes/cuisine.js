const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get("/recipe/category/:cuisine", (req, res) => {
    let cuisineSelected = req.params.cuisine;
    Recipe.find({
        cuisine: cuisineSelected
    })
    .then(recipes => {
      res.render('recipes/list',{recipes: recipes});
    })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = app;
