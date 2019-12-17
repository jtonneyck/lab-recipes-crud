
const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");



app.get("/recipes/delete/:id", (req,res)=> {
    let recipeId = req.params.id
    Recipe.findByIdAndDelete(recipeId)
        .then(() => {
            res.redirect("/recipes")
        })
        .catch(err => console.log(err));
});



module.exports = app;
