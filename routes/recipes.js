const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes", (req,res)=> {
    Recipe.find()
        .then((recipeData)=> {
            res.render("recipes", {recipes:recipeData});
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

app.post('/recipes', (req,res)=>{
    console.log(req.body)
    Recipe
        .create({
            title: req.body.title,
            cuisine: req.body.cuisine,
            creator: req.body.creator,
            duration: req.body.duration
        })
        .then(()=> {
            res.redirect('/recipes');
        })
        .catch((err)=> {
            res.send("error");
        })
})

app.post('/edit/:id', (req, res)=>{
    Recipe
        .findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            cuisine:req.body.cuisine,
            creator:req.body.creator,
            duration:req.body.duration
        })
        .then(recipe=>{
            res.redirect('/recipe-info/' + req.params.id)
        })
        .catch(err=>console.log(err))
})

module.exports = app