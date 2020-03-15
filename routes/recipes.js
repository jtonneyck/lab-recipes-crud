const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/", (req, res) => {
    Recipe.find({})
        .then((recipes) => {
            res.render("recipes/list", { recipesLoop: recipes })
        })
        .catch((err) => {
            res.render("error", err);
        })
})

app.get("/recipes-info/:id", (req, res) => {
    Recipe
        .findById(req.params.id)
        .then((recipes) => {
            res.render("recipes-info", { recipesLoop: recipes })
        })
        .catch((err) => {
            res.render("error", err);
        })
})


app.get("/recipes/delete/:id", (req, res)=>{  
    Recipe   
        .findByIdAndDelete(req.params.id)
        .then((recipes)=>{
            res.redirect("/")
        })
        .catch((error)=>{
            console.log("Error:", error)
        })
})

app.get("/recipes/create", (req,res)=> {
        res.render("create-recipe");
})

app.post("/recipes/create", (req,res)=> {
    Recipe
        .create({
            title: req.body.title,
            cuisine: req.body.cuisine,
            creator: req.body.creator,
            duration: req.body.duration
        })
        .then((recipe)=> {
            res.redirect("/");
        })
        .catch((err)=> {
            res.send("error");
        })
})

// app.get("/recipes/update/:id", (req, res)=>{  
//     Recipe   
//         .findByIdAndDelete(req.params.id)
//         .then((recipes)=>{
//             res.redirect("/")
//         })
//         .catch((error)=>{
//             console.log("Error:", error)
//         })
// })

module.exports = app;