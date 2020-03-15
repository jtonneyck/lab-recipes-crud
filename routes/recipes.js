const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes", (req,res)=> {
    Recipe
        .find()
        .then((recipes)=> {
            res.render("Recipes", {recipesHbs: recipes});
        })
        .catch((err)=> {
            res.render("error", err);
        })
})


app.get("/recipes/:id", (req,res)=> {
    Recipe
        .findById(req.params.id)
        .then((recipes)=> {
            res.render("Recipe-detail", {recipesHbs: recipes});
        })
        .catch((err)=> {
        res.render("error", err);
    })
})


app.get("/recipes/delete/:id", (req, res)=>{
    Recipe   
        .findByIdAndDelete(req.params.id)
        .then((recipes)=>{
            res.redirect("/recipes",{recipesHbs: recipes})
        })
        .catch((error)=>{
            console.log("Error:", error)
        })
})

app.get("/recipes/create/create", (req,res)=> {
        res.render("create-recipe");
})

app.post("/recipes/create/create", (req,res)=> {
    console.log(req.body);
    Recipe
        .create({
            title: req.body.title,
            cuisine: req.body.cuisine,
            creator: req.body.creator,
            duration: req.body.duration
        })
        .then((recipe)=> {
            res.redirect(`/recipes`);
        })
        .catch((err)=> {
            console.log("Error:", err)
        })
})


module.exports = app;