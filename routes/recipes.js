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

app.get("/recipes/create/:id", (req,res)=> {
        res.render("create-recipe");
})

app.post("/recipes/create/:id", (req,res)=> {
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

app.get("/recipes/update/:id", (req,res)=> {
    Recipe
        .findById(req.params.id)
        .then((recipes)=> {
            res.render("update-recipe", {recipesHbs: recipes});
        })
        .catch((err)=> {
            res.send("Error");
        })
})

app.post("/recipes/update/:id", (req,res)=> {
    Recipe
        .findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            creator: req.body.creator,
            cuisine: req.body.cuisine,
            duration: req.body.duration,
        })
        .then((recipe)=> {
            res.redirect(`/recipes/${recipe._id}`);
        })
        .catch((err)=> {
            res.send("err");
        })
})

module.exports = app;