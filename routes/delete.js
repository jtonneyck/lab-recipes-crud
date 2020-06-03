const express = require('express');
const  app = express();
const Recipe = require('../models/Recipe.model');

app.get('/delete/:recipeId', (req, res) => {
    Recipe.remove({_id:req.params.recipeId})
    .then((deletedRecipe)=> {
      res.redirect('/')
    })
    .catch(error => {
      console.error('Cannot delete the recipe', error);
    })
  })

  module.exports = app