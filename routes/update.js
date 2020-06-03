const express = require('express');
const  app = express();
const Recipe = require('../models/Recipe.model');

app.get("/update/:recipeId", (req,res)=>{
    Recipe
      .findById(req.params.recipeId)
      .then(recipe =>{
        res.render('update', {recipe})
      })
      .catch(error => {
        console.error('Cannot render the recipe details', error);
      })
  })

  app.post('/update/add', (req, res)=> {
    debugger
    console.log(req.body)
    const recipeId = req.body._id;
    Recipe.findByIdAndUpdate( recipeId ,{
        title: req.body.title,
        ingredients: req.body.ingredients,
        level: req.body.level,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator,
    }, false)
    .then((recipe) => {
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
    })
});
  module.exports = app