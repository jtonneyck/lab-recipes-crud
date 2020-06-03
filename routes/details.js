const express = require('express');
const  app = express();
const Recipe = require('../models/Recipe.model');

app.get("/index/:recipeId", (req,res)=>{
    Recipe
      .findById(req.params.recipeId)
      .then(recipe =>{
        res.render('recipeDetails', {recipe})
      })
      .catch(error => {
        console.error('Cannot render the recipe details', error);
      })
  })

  module.exports = app