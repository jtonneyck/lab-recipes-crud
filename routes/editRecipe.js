const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/edit/:id", (req, res) => {
    Recipe
    .findById(req.params.id)
    .then(data =>{
        res.render("recipes/editRecipe", {recipe: data}) //recipe match 1
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
    .then(recipeDocument => {
        // res.redirect(`/edit/${recipeDocument._id}`)
        res.render('recipes/oneRecipe.hbs', {recipe: recipeDocument})

    })
    .catch(err => console.log(err));
})


module.exports = app;