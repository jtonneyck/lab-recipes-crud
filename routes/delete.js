const express = require('express');
const app = express();
const Recipe = require('../models/Recipe.model');

app.get("/recipe/delete", (req, res) => {
    let recipeToDelete = req.query.id
    Recipe.findByIdAndDelete(recipeToDelete)
      .then((recipeDeleted) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = app;
