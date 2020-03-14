const express = require("express");
const app = express();
const Recipe = require("../models/recipe");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  Recipe.find({})
    .then(respond => {
      res.render("recipes/list.hbs", { allRecipes: respond });
    })
    .catch(err => {
      res.render("error", err);
    });
});

//CREATE
app.get("/create", (req, res) => {
  res.render("recipes/create.hbs");
});

app.post("/create", (req,res) =>{
  console.log(req.body);
  Recipe
      .create({
          title: req.body.title,
          cuisine: req.body.cuisine,
          duration: req.body.duration,
          dishType: req.body.dishType,
          level: req.body.level,
          ingredients: req.body.ingredients,
          image: req.body.image,
      })
      .then((newRecipe) =>{
        res.redirect(`/recipes/${newRecipe.id}`)
      })
      .catch((error) =>{
          res.send("error", error)
      })
})

//RECIPE DETAIL
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


//DELETE

app.get("/:id/delete", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(recipe => {
      res.redirect("/recipes");
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

// app.get("/:id/delete", (req, res) => {
//   console.log(req);
//   console.log(`The recipe ${req.params.id} will be deleted`);
//   res.redirect("/recipes");
// });




module.exports = app;
