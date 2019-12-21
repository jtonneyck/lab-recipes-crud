const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");



app.get("/create", (req, res) => {
    res.render("recipes/createRecipe.hbs")
})

app.post("/create", (req, res) => {
    let newRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration
    }

    Recipe.create(newRecipe)
    .then(() => {
        res.redirect("/recipes")
    })
    .catch(err => console.log(err))
})


module.exports = app