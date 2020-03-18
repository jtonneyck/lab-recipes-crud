const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

//1 list
app.get("/recipes", (req, res) => {
    Recipe
        .find({})
        .then((recipes) => {
            res.render("recipes/list", {
                recepiesHBS: recipes
            });
        })
        .catch((err) => {
            res.render("error", err);
        })
})

//2 detail
app.get("/recipes/detail/:id", (req, res) => {
    Recipe
        .findById(req.params.id)
        .then((recipeData) => {
            res.render("recipes/detail", {
                recipeHbs: recipeData
            });
        })
        .catch((err) => {
            res.send('error');
        })
})
//3 delete
app.get("/recipes/delete/:id", (req, res) => {
    Recipe
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/recipes")
        })
        .catch((err) => {
            res.send('error');
        })
})
//4 create
app.get('/recipes/create', (req, res) => {
    res.render("recipes/create");
});
app.post('/recipes/create', (req, res) => {
    Recipe
        .create({
            title: req.body.title,
            cuisine: req.body.cuisine,
            image: req.body.image,
            level: req.body.level,
            dishType: req.body.dishType,
            duration: req.body.duration,
            creator: req.body.creator
        })
        .then(() => {
            res.redirect('/recipes');
        })
        .catch((err) => {
            res.send('error');
        })
});
//5 update
app.get("/recipes/update/:id", (req, res) => {
    Recipe
        .findById(req.params.id)
        .then((recipeData) => {
            res.render("recipes/update", {
                recipeHbs: recipeData
            });
        })
        .catch((err) => {
            res.send('error');
        })
})
app.post("/recipes/update/:id", (req, res, next) => {
    Recipe
        .findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            cuisine: req.body.cuisine,
            image: req.body.image,
            level: req.body.level,
            dishType: req.body.dishType,
            duration: req.body.duration,
            creator: req.body.creator
        })
        .then((recipeHbs) => {
            res.redirect(`/recipes/detail/${recipeHbs._id}`);
        })
        .catch((err) => {
            res.send('error');
        })
})

module.exports = app