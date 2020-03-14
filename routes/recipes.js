const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/", (req, res) => {
  Recipe.find({})
    .then(respond => {
      res.render("recipes/list.hbs", { allRecipes: respond });
    })
    .catch(err => {
      res.render("error", err);
    });
});

app.get("/:id", (req, res) => {
  console.log("Rendering route");
  Recipe.findById(req.params.id)
    .then(respond => {
      console.log("the response is", respond);
      res.render("recipes/recipe-detail.hbs", { oneRecipe: respond });
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

// app.get("/recipe/:id/delete", (req, res) => {
//   Recipe.findByIdAndDelete(req.params.id)
//     .then(recipe => {
//       res.redirect("/recipes");
//     })
//     .catch(err => {
//       console.log("this is an error", err);
//       res.send("error", err);
//     });
// });

app.get("/:id/delete", (req, res) => {
  console.log(req);
  console.log(`The recipe ${req.params.id} will be deleted`);
  res.redirect("/recipes");
});

app.get("/create", (req, res) => {
  res.render("recipes/create.hbs");
});

module.exports = app;
