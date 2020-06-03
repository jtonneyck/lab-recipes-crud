const express = require('express')
const app = express()
const Recipe = require("../../models/recipes.js");

let idToEditRecipe = "";

app.get('/recipes/details/edit', (req, res, next) => {
    idToEditRecipe = req.query.id

    Recipe.findOne({ _id: idToEditRecipe})
        .then(recipes => {
            res.render(`edit`, {recipes})
        })
        .catch(error => {
            console.log("Error filling form", error)
        })
})

// This is where I left, to update the recipe in the database

app.post('/recipes/details/edit', (req, res, next) => {
    Recipe.findOneAndUpdate({ _id: idToEditRecipe }, {
        $set:  {
            title: req.body.title,
            level: req.body.level, 
            /*ingredients,*/ 
            cuisine: req.body.cuisine, 
            dishType: req.body.dishType, 
            image: req.body.image, 
            duration: req.body.duration, 
            creator: req.body.creator, 
            created: req.body.created 
        }
    })
    .then(() => {
        res.redirect(`/recipes/details/?id=${idToEditRecipe}`);
    })
    .catch((error) => {
        console.log(error);
    })
});

module.exports = app;