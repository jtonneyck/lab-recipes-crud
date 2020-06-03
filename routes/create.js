const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/create", (req, res)=>{
     res.render("recipes/create");
})

app.post("/recipes/create", (req, res)=>{
    let newRecipe = req.body;
    // The field cuisine is required, add default value if not completed
    if (newRecipe.cuisine === "" ){
        newRecipe.cuisine = "unknown";
    }
    if (newRecipe.image === "" ){
        newRecipe.image = "https://images.media-allrecipes.com/images/75131.jpg";
    }
    
    
    Recipe.create(newRecipe)
    .then((recipe)=>{
        res.redirect(`/recipes/detail/${recipe._id}`)
    })
    .catch((err)=> {
        // res.render(err);
        console.log(err)
    })
})

module.exports = app;