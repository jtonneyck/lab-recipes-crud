const express = require('express');
const  app = express();
const Recipe = require('../models/Recipe.model');

app.get('/',(req, res) =>{
    Recipe
      .find({})
      .then(allRecipes => {
        res.render('index.hbs', {allRecipes})
      })
      .catch(error => {
        console.error('Cannot render recipes', error);
      })
})

module.exports = app