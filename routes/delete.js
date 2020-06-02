const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/recipes/delete/:id", (req, res)=>{
    let objectId = req.params.id
    console.log(objectId)
    Recipe.findByIdAndDelete(objectId)
    
    .then((deletedRecipe)=>{
        res.redirect("/recipes")
    })
    .catch((err)=> {
        res.render(err);
    })
})

module.exports = app;