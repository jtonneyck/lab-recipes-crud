const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/delete-recipe/:id", (req,res)=> {
    Recipe.remove({_id:req.params.id})
        .then(()=> {
            res.redirect("../recipes");
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app