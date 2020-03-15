const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then(dataList => {
      res.render("recipes/list.hbs", { recipes: dataList });
    })
    .catch(err => console.log(err));
});

module.exports = app;
