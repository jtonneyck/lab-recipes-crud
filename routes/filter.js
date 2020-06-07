const express = require("express");
const app = express();
const Recipe = require("../models/recipe");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/filter", (req, res) => {
  var categories = req.query.category;

  Recipe.find({ cuisine: { $in: categories } })
    .then((recipes) => {
      res.render("recipes/filter", { recipes: recipes });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
