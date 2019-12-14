const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/", (req, res) => {
    Recipe.find({})
        .then((recipes) => {
            res.render("recipes/list", recipes);
        })
        .catch((err) => {
            res.render("error", err);
        })
})

module.exports = app