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

// //Create a new recipe
app.get('/create', (req, res) => {
  res.render('recipes/createRecipe');
});

app.post('/create', (req, res) => {
  console.log(req.body);
  Recipe.create({
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
    .then(recipe => {
      res.redirect(`/recipes/${recipe.id}`);
    })
    .catch(err => {
      res.send('error');
    });
  // res.render("createRecipe");
});

//Redirects to one recipe
app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.render('recipes/recipe', { recipeList: recipe });
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
    });
});




//Update a recipe
// app.get('/recipes/update/:id', (req, res) => {
//   Recipe
//   .findById(req.params.id)
//     .then((recipe) => {
//       res.redirect('/recipes/update/:id', {recipeList: recipe});
//     })
//     .catch((err) => {
//       res.send('error');
//     });
// });

// app.post('/recipes/update/:id', (req, res) => {
//   Recipe
//   .findByIdAndUpdate(req.params.id, {
//     title: req.body.title,
//     level: req.body.level,
//     creator: req.body.creator,
//     duration: req.body.duration,
//   })
//     .then(recipe => {
//       res.redirect(`/recipes/${recipeList._id}`);
//     })
//     .catch(err => {
//       res.send('err');
//     });
// });



module.exports = app
