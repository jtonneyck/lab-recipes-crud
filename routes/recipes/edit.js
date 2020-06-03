const express = require('express')
const app = express()
const Recipe = require("../../models/recipes.js");

app.get('/recipes/details/edit', (req, res, next) => {
    let idToEditRecipe = req.query.id

    Recipe.findOne({ _id: idToEditRecipe})
        .then(recipes => {
            res.render(`edit`, {recipes})
        })
        .catch(error => {
            console.log("Error filling form", error)
        })
})

// This is where I left, to update the recipe in the database

// app.post('/recipes/details/edit', (req, res, next) => {
//     debugger

//     const { title, level, /*ingredients,*/ cuisine, dishType, image, duration, creator, created } = req.body;
//     Recipe.updateMany({ _id: req.query.id }, { $set: { title, level, /*ingredients,*/ cuisine, dishType, image, duration, creator, created } }, { new: true })
//         .then((recipes) => {
//             res.redirect(`/recipes/details/?id=${recipes._id}`);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// });

module.exports = app;