const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/edit/:id", (req, res) => {
    Recipe
    .findById({_id: req.params.id})
    .then(data =>{
        res.render("recipes/editRecipe", {recipes: data[0]})
    })
    .catch(err => console.log(err));
});

app.post("/edit", (req, res) => {
    let recipeId = req.body.id;
    let newRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator
    }
    Recipe
    .findByIdAndUpdate(recipeId, newRecipe, {new: true})
    .then(data => {
        res.render("recipes/oneRecipe", {recipe: data})
    })
    .catch(err => console.log(err));
})


module.exports = app;