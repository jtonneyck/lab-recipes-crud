const express = require('express'),
    router = express.Router();
    const recipesModel = require('../models/Recipe.model')

//===========test for first recipe inserted======
    // router.get('/insertTempData',(req,res)=>{
    //     const recipe = new recipesModel({
    //         title: "chapati",
    //         level: "bread",
    //         ingredients: "flour",
    //         cousine: "Indian",
    //         dishType: "flat Bread",
    //         image: "https://images.media-allrecipes.com/images/75131.jpg",
    //         duration: "20",
    //         creator: "World",
    //         created: "2020-03-21"
    //     })
        
    //     recipe.save(function(err){
    //     res.send('saved scusse')ls
    //     })
    //     });

    //===========test for first recipe inserted======

        router.get('/',(req,res)=>{
            recipesModel.find({}).then(data=>res.render('index', {data})); //in the recipes model find {all data} then send to (render) index page {the actual data} braces wraps data array in to object
            });

            router.get('/recipe/:id',(req,res)=>{
               recipesModel.findOne({_id:req.params.id}).then(data=>res.render('recipedetails', data)); // gets request id from url then findOne with ID paramiters then render(populate) recipedetails witht the data)
             });

             router.get('/delete/:id',(req,res)=>{
                recipesModel.deleteOne({_id:req.params.id}).then(data=>res.redirect('/recipes')); // like an event lister- uses the deleteOne function sends back to recipes page
              });

              router.get('/create',(req,res)=>{ //renders the create.hbs form - then form is shown
                res.render('create')
              });

              router.post('/save',(req,res)=>{ //submit form
                  req.body.ingredients=req.body.ingredients.split(',')  //splits ingredients string in to an array
                  if(req.body.image==''){ // checks it image is empty, then deletes image property from the request object (form)
                      delete req.body.image //removing the image from the request
                  }
                    // res.json(req.body) ---this is good for capturing data being passed in the json file

                recipesModel.create(req.body, function (err, recipe) { //creating new recipe, 
                    if (err) throw err;                                                    // if theres an error show it otherwise will go to the next line
                    res.redirect(`/recipes/recipe/${recipe._id}`)
                  });
                });

                router.get('/update/:id',(req,res)=>{
   
                    recipesModel.findOne({_id:req.params.id}).then(recipe=>{
                        const modifyDate = new Date(recipe.created);
                        recipe.created = `${modifyDate.getFullYear()}-${modifyDate.getMonth()}-${modifyDate.getDay()}`
                        res.render('update',recipe)
                       })
                   });
                   
                   router.post('/update',(req,res)=>{
                    recipesModel.findOne({_id:req.body.id}).then(recipe=>{
                        recipe.title = req.body.title;
                        recipe.level = req.body.level;
                        recipe.ingredients = req.body.ingredients;
                        recipe.cousine = req.body.cousine;
                        recipe.dishType = req.body.dishType;
                        recipe.image = req.body.image;
                        recipe.duration = req.body.duration;
                        recipe.creator = req.body.creator;
                        recipe.created = req.body.created;
                        recipe.save();
                        res.redirect(`/recipes/recipe/${req.body.id}`)
                        
                    });
                    })
            module.exports=router // declare this file availble in the whole app (code splitting with index.js)