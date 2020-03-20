const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

//Firstpage
app.get("/recipes", (req,res, next)=> {
    Recipe.find({})
      .then(recipes => {
        res.render('recipes/list', { recipeList: recipes });
      })
      .catch(err => {
        next('Error, something went wrong.');
      });
})

//Redirects to one recipe
app.get('/recipes/details/:id', (req, res, next) => {
  Recipe
  .findById(req.params.id)
    .then(recipe => {
      res.render('recipes/recipe', { recipeList: recipe });
    })
    .catch((err) => {
      next('Error, something went wrong.');
    });
});



// //Create a new recipe
app.get('/recipes/create', (req, res) => {
  res.render('recipes/createRecipe');
});

app.post('/recipes/create', (req, res, next) => {
  console.log(req.body);
  Recipe
  .create({
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator,
    created: req.body.created,
  })
    .then((recipe) => {
      res.redirect(`/recipes/details/${recipe._id}`);
    })
    .catch(err => {
      next('Error, could not create new recipe.');
    });
});

//Delete and redirects to firstpage
app.get('/recipes/delete/:id', (req, res, next) => {
  Recipe
  .findByIdAndDelete(req.params.id)
    .then(recipe => {
      res.redirect('/recipes');
    })
    .catch((err) => {
      next('Error, something went wrong.');
    });
});

// Update a recipe
app.get('/recipes/update/:id', (req, res, next) => {
    debugger
  Recipe
  .findById(req.params.id)
    .then(recipes => {
      res.render('recipes/updateRecipe', { recipeList: recipes });
    })
    .catch(err => {
      next('Error, something went wrong.');
    });
});

app.post('/recipes/update/:id', (req, res, next) => {
  Recipe
  .findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    level: req.body.level,
    creator: req.body.creator,
    duration: req.body.duration,
  })
    .then(recipe => {
      res.redirect(`/recipes/details/${recipe._id}`);
    })
    .catch(err => {
      next('Error, something went wrong.');
    });
});

module.exports = app
