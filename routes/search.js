const express = require("express");
const app = express();
const Recipe = require("../models/recipe");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/search", (req, res) => {
  var searchTerm = req.query.searchTerm;
  console.log(searchTerm);

  Recipe.find({ $text: { $search: searchTerm } })
    .then((matchingRecipes) => {
      console.log(matchingRecipes.length);
      res.render("recipes/list", {
        allRecipesFromDB: matchingRecipes,
        isListEmpty: matchingRecipes.length === 0 ? true : false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
