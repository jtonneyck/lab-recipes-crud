const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/update/:id", (req, res) =>{
    let objectId = req.params.id
    Recipe.findById(objectId)
    .then((recipe)=>{
        res.render("recipes/update", {recipe: recipe})
    })
    .catch((err)=> {
        res.render(err);
    })
})

app.post("/recipes/update", (req, res)=>{
    let recipeId = req.body.id;
    Recipe.findByIdAndUpdate(recipeId, {
        title: req.body.title,
        image: req.body.image,
        level: req.body.level,
        cuisine: req.body.cuisine,
        creator: req.body.creator,
        dishType: req.body.dishType,
        ingredients: req.body.ingredients
    })
    .then((recipe)=>{
        res.redirect(`detail/${recipe._id}`)
    })
    .catch((err)=> {
        res.render(err);
    })
})

module.exports = app;