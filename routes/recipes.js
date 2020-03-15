const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

//Firstpage
app.get("/recipes", (req,res)=> {
    Recipe
        .find({})
        .then((recipes)=> {
            res.render('recipes/list', { recipeList: recipes })
            .catch((err) => {
              res.send('error');
            });
    })
})

//Redirects to one recipe
app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.render("recipes/recipe", { recipeList: recipe });
    })
    .catch((err) => {
      res.send('error');
    });
});

//Delete and redirects to firstpage
app.get('/recipes/delete/:id', (req, res) => {
  Recipe
  .findByIdAndDelete(req.params.id)
    .then(recipe => {
      res.redirect('/recipes');
    })
    .catch((err) => {
      res.send('error');
    })
});




module.exports = app
