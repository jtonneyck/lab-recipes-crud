const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");

app.get("/detailedRecipe", (req,res)=> {
    let recipeId = req.query.id //queries here also means queries in list.hbs
    Recipe.findById(recipeId)
  
        .populate("creator")
        .then((recipe)=> {
            res.render("recipes/detailedRecipe.hbs", { recipe: recipe });
        })
        .catch((err)=> {
            console.log(("error", err));
        })
})

module.exports = app