const express = require("express");
const app = express();
const Recipe = require("../models/Recipe");
const multer  = require('multer');
const upload = multer({ dest: 'public/'});

//Page that contains all of the recipes
app.get("/recipes", (request, response) => {
    Recipe
        .find()
        .then((recipeData) => {
            response.render('recipes', {recipeHbs: recipeData});
        })
        .catch((error) => {
            response.send("error charles!", error);
        });
});

//Loads the detail page of your chosen recipe
app.get('/recipes/detail/:recipeId', (request, response) => {
    Recipe
        .findById(request.params.recipeId)
        .then((recipeData) => {
            response.render('../views/detail', {recipeHbs: recipeData});
        })
        .catch((error) => {
            response.send("error", error);
        });
});

//You can delete your recipe
app.get('/recipes/delete/:recipeId', (request, response) => {
    Recipe
        .findByIdAndDelete(request.params.recipeId)
        .then((recipeData) => {
            response.redirect("/recipes");
        })
        .catch((error) => {
            response.send("error", error);
        });
});

//Page where you can add your own recipes
app.get("/recipes/create", (request,response)=> {
    response.render("add");
});

app.post("/recipes/create", upload.single('preparationSteps'), (request,response) => {
    Recipe
        .create({
            title: request.body.title,
            level: request.body.level,
            cuisine: request.body.cuisine,
            dishType: request.body.dishType,
            duration: request.body.duration,
            image: request.body.image,
            file: request.file.filename
        })
        .then((recipeInfo)=> {
            console.log("Yes")
            response.redirect("/recipes");
        })
        .catch((err)=> {
            console.log("No")
            response.send("error CVDB");
        });
});

//Page where you can update the recipe
app.get("/recipes/update/:recipeId", (request,response)=> {
    Recipe
        .findById(request.params.recipeId)
        .then((recipeData)=> {
            response.render("update", {recipeHbs: recipeData});
        })
        .catch((err)=> {
            response.send("Error");
        });
});

app.post("/recipes/update/:recipeId", (request,response)=> {
    console.log(request.body)
    Recipe
        .findByIdAndUpdate(request.params.recipeId,{
            title: request.body.title,
            level: request.body.level,
            cuisine: request.body.cuisine,
            dishType: request.body.dishType,
            duration: request.body.duration,
            image: request.body.image
        })
        .then((recipeData)=> {
            response.redirect(`/recipes/detail/${recipeData._id}`);
        })
        .catch((err)=> {
            response.send("err");
        });
});

module.exports = app;