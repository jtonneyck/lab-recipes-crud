const express = require("express");
const app = express();
const Recipe = require("../models/recipe");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/update", (req, res) => {
  Recipe.findById(req.query.id)
    .then((recipe) => {
      res.render("recipes/update", { recipe: recipe });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  debugger;
  let recipeId = req.query.id;
  console.log("update recipe id", recipeId);
  Recipe.findByIdAndUpdate(recipeId, {
    title: req.body.title,
    level: req.body.level,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    creator: req.body.creator,
    duration: req.body.duration,
    image: req.body.image,
    ingredients: req.body.ingredients.split(","),
  })
    .then((recipe) => {
      res.redirect(`/detail/?id=${recipe._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
