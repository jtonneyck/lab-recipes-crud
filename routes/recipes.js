const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes", (req,res)=> {
    Recipe
        .find({})
        .then((recipes)=> {
            res.render('recipes/list', { recipeList: recipes })
            .catch(err => {
              res.render('error', err);
            });
    })
})


app.get('/recipes/recipe/:title', (req, res) => {
  Recipe
  .findOne({title: ''})
    .then(recipes => {
      res.render('recipe', { recipeList: recipes });
    })
    .catch(err => {
      res.send('error', err);
    });
});

// app.get('/movie/search/results', (req, res) => {
//   console.log(req.query.title);
//   Movie.find({ title: req.query.title })
//     .then(moviesData => {
//       res.render('movies', { moviesHbs: moviesData });
//     })
//     .catch(err => {
//       console.log('error', err);
//     });
// });




module.exports = app
