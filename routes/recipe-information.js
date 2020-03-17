const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipe-info/:id", (req,res)=> {
    Recipe.findById(req.params.id)
        .then((recipe)=> {
            res.render("recipe-info", {recipe:recipe});
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app