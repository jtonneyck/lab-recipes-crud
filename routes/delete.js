const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/delete", (req,res)=>{
    const recipeId = req.query.id;

    console.log(recipeId);
    Recipe
        .findByIdAndDelete(recipeId)
        .then(recipe=>{
            res.redirect('/recipes');
        })
        .catch(err=>{
            console.log(err);
        }) 
})

module.exports = app;