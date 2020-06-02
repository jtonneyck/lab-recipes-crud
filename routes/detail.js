const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/detail/:id", (req, res)=>{
    let objectId = req.params.id
    Recipe.findById(objectId)
    .then((recipe)=>{
        res.render("recipes/detail", {recipe: recipe})
    })
    .catch((err)=> {
        res.render(err);
    })
})

module.exports = app;