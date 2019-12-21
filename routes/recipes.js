const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");

app.get("/recipes", (req,res)=> {
    Recipe.find({})
        .then((recipes)=> {
            res.render("recipes/list.hbs", {recipes: recipes });
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app

