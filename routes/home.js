const express = require('express');
const app  = express.Router();

const Recipe = require('../models/Recipe.model.js'); // <== add this line






app.get("/list", (req,res)=> {
    Recipe.find({})
        .then((recipe)=> {
            res.render("home1.hbs", {recipe});
        })
        .catch((err)=> {
            res.render("error", err);
        })
  })
  
  
  
  
  app.get("/recipes/:id", (req,res)=> {
    Recipe.findById(req.params.id)
        .then((recipe)=> {
        //  console.log(recipe);
            res.render("info.hbs", {recipe});
        })
        .catch((err)=> {
            res.render("error", err);
        })
  })
  
  //delete
  
  app.get("/recdelete/:id", (req,res)=> {
    Recipe.findByIdAndDelete(req.params.id)
        .then((recipe)=> {
          console.log(recipe);
  
          res.redirect("/list");
          //res.render("delete.hbs", {recipe});
        })
        .catch((err)=> {
            res.render("error", err);
        })    
  })
  
  
  
  //create
  
  app.get("/create", (req,res)=> {
          res.render("create.hbs");
  })
  
  app.post("/recipe/createdata", (req, res) => {
    Recipe
    .create({
      title:req.body.title,
      cuisine:req.body.cuisine,
      duration:req.body.duration,
  })
  
      .then((recipeData)=> {
              console.log("added:",recipeData)
              res.redirect(`/list`);
          })
          .catch((err)=> {
              res.send(err);
          })
  })
  
  
  //update 
  
  
  
  app.get("/update/:id", (req,res)=> {
    console.log(req.param.id)
  
  Recipe.findById(req.params.id)
        .then((data) => {
  console.log(data);
        
  res.render("update", {upload:data});
  
        })
    
  .catch( (err) => {
  
    res.send('error')
  })
  })
  
  
  app.post("/update/:id", (req,res)=> {
    Recipe
        .findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            level:req.body.level,
            ingredients:[],
            cuisine:req.body.cuisine,
            dishType:req.body.dishType,
            image:req.body.imageUrl,
            duration:req.body.duration,
            creator:req.body.creator
        })
        .then((recipeData)=> {
            res.redirect(`/list`);
        })
        .catch((err)=> {
            res.send(err);
        })
  })
  




module.exports = app;