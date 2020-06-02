const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes", (req,res)=>{
    Recipe
    .find({})
    .then(allRecipesFromDB=>{
        res.render('recipes/list', {allRecipesFromDB:allRecipesFromDB});

    })
    .catch(err=>{
        console.log(err);
    }) 
})

module.exports = app;