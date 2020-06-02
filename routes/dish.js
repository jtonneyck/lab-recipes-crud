const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/dish", (req, res)=>{
    res.render("recipes/dishes/checkboxes")
})

app.post("/recipes/dish/result", (req, res)=>{
    console.log(req.body.dishType)
    Recipe.find({
        dishType : {$in: req.body.dishType}
    })
    .then((recipe)=>{
        res.render("recipes/list", {recipes: recipe})
    })
    .catch((err)=> {
        res.render(err);
    })
})

module.exports = app;