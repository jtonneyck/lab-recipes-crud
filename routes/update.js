const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get('/recipe/update', (req, res) => {
    let objectId = req.query.id;
    Recipe.findById(objectId)
    .then((recipe) => {
      res.render("recipes/updateRecipe", {recipe: recipe});
    })
    .catch((error) => {
      console.log(error);
    })
});

app.post("/recipe/update", (req, res) => {
    let recipeId = req.body._id;
    Recipe.findByIdAndUpdate(recipeId, {
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator,
        created: req.body.created
    })
      .then((updateRecipe) => {
        res.redirect(`/recipe/details?id=${updateRecipe._id}`);
      })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = app;
