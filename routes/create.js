const express = require("express");
const app = express();
const Recipe = require("../models/recipe");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.get("/create", (req, res) => {
  //name match 2 see hbs
  res.render("recipes/createRecipe");
});

app.post("/create", upload.single("rcpImg"), (req, res, next ) => {
  let newRecipe = {
      
    title: req.body.title,
    level: req.body.level,
    ingredients: [req.body.ingredients],
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    // image: req.body.image,
    image: req.file.filename,
    duration: req.body.duration,
    creator: req.body.creator,
    created: req.body.created
    // path: `/uploads/${req.file.filename}`
    // file_upload: req.file.path
  };


  Recipe.create(newRecipe)
    .then(respond => {
      res.redirect("/recipes", { recipe: respond });
    })
    .catch(err => console.log(err));
});

module.exports = app;
