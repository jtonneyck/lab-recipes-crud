const express = require("express");
const app = express();
const Recipe = require("../models/recipe");


app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params._id)
    .then(dataRecipe =>{
        res.render("recipes/oneRecipe.hbs", {recipe: dataRecipe})
    })
    .catch(err => console.log(err));
});