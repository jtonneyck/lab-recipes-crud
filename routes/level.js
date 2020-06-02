const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/level", (req, res)=>{
    res.render("recipes/levels/checkboxes")
})

app.post("/recipes/level/result", (req, res)=>{
    Recipe.find({
        level : {$in: req.body.level}
    })
    .then((recipe)=>{
        res.render("recipes/list", {recipes: recipe})
    })
    .catch((err)=> {
        res.render(err);
    })
})

module.exports = app;