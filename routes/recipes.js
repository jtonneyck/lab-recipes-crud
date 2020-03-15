const express = require("express");
const app = express();
const Recipe = require("../models/recipe.js");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req,res)=> {
    Recipe
    .find()
    .then((recipeData)=> {
        res.render("recipes/list", {recipes: recipeData});
    })
    .catch((err)=> {
        res.render("error", err);
    })
})

app.get("/:id", (req,res)=> {
    Recipe
    .findById(req.params.id)
    .then((recipeData)=> {
        res.render("recipe", {recipe: recipeData});
    })
    .catch((error)=> {
        console.log(error);
    })
})

app.get("/delete/:id", (req, res) =>{
    Recipe
    .findByIdAndDelete(req.params.id)
    .then((recipe) =>{
        res.redirect("/recipes");
    })
    .catch((error) =>{
        console.log(error);
    })
})

app.get("/create/create", (req, res) =>{
    res.render("createRecipe");
})

app.post("/create", (req, res) =>{
    console.log(req.body);
    Recipe
        .create({
            title: req.body.title,
            level: req.body.level,
            ingredients: req.body.ingredients,
            cuisine: req.body.cuisine,
            dishType: req.body.dishType,
            duration: req.body.duration,
            creater: req.body.creater,
        })
        .then((newRecipe) =>{
            res.redirect(`/recipes`);
        })
        .catch((error) =>{
            console.log(error)
        })
})

module.exports = app;
