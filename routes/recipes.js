const express = require("express");
const app = express();
const recipe = require("../models/Recipe");

app.get("/recipes", (req,res)=> {
    recipe.find({})
        .then((recipes)=> {
            res.render("recipes/list.hbs", {recipes: recipes });
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app

