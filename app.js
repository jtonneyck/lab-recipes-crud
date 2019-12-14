const BACKEND_SERVER_PORT=2999;
const FRONTEND_SERVER_PORT=3000;

const express = require('express');

/******************************* BACK END STUFF ************************************/
const backendserver=express();

const mongoose=require('mongoose');

// ?????? mongoose.Promise=global.Promise;

// NOTE this apparently is how the connect function of mongoose works!!
mongoose.connect("mongodb://localhost/recipeApp",
					{useNewUrlParser: true}
				).then(function(){
							console.log("Successfully connected to the recipeApp database.");
						}
        		).catch(function(err){console.log('Could not connect to the recipeApp. Exiting now...');process.exit();});

/////////backendserver.use(bodyParser.urlencoded({extended:true}));
backendserver.use(require('body-parser').json()); // the backend server needs this

// connect all the backend server routes, passing in the backend server and the connection
require(__dirname+'/ironhack/routes/msd.recipe.routes.js')(backendserver,mongoose);

// make the backend server listen on port 2999
backendserver.listen(BACKEND_SERVER_PORT,()=>{console.log("Backend server is listening on port "+BACKEND_SERVER_PORT+".");});

/******************************* FRONT END STUFF ***********************************/
const app = express(); // a new server for running the front-end

const hbs=require('hbs');

app.set('view engine','hbs');

app.set('views',__dirname+'/views');

hbs.registerPartials(__dirname+"/views/partials");

// tell express where the static content is located
app.set(express.static,__dirname+"/public");

// with thanks to Piepongwong (see https://github.com/github/fetch/issues/323)

// the front-end server needs this (and not the json() call), it's the other way round for the backend server
app.use(require('body-parser').urlencoded({extended:true})); // ???????
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// FRONT-END ROUTES
app.get('/', function(req, res){
    res.json({"message": "Welcome to the recipeApp Server."});
});

// showing all recipes!!
/* example fetch
const response = await fetch('http://example.com/movies.json');
const myJson = await response.json();
*/

const fetch=require('node-fetch'); // so we can use fetch()

// 1. Showing all recipes
app.get('/recipes',
			(req,res)=>{
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes")
					.then(
						(response)=>{
							return response.json();
						})
					.then(
						(recipes)=>{
							console.log("Received recipes: ",recipes);
							res.render('recipes',{recipes:recipes});
						})
					.catch(
						(err)=>{
							res.status(404).send({"error":err});
						}
					);
			}
		);

// 2. Editing a recipe
app.get('/recipe/:recipeId/edit',
		(req,res)=>{
			fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+req.params.recipeId)
			.then(
				(response)=>{
					return response.json();
				})
			.then(
				(recipe)=>{
					console.log("Received recipe: ",recipe);
					res.render('recipeedit',{recipe:recipe});
				})
			.catch(
				(err)=>{
					res.status(404).send({"error":err});
				})
	}
);

// 3. Showing a single recipe (detailed)
app.get('/recipes/:recipeId',
			(req,res)=>{
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+req.params.recipeId)
					.then(
						(response)=>{
							return response.json();
						})
					.then(
						(recipe)=>{
							console.log("Received recipe: ",recipe);
							res.render('recipedetails',{recipe:recipe});
						})
					.catch(
						(err)=>{
							res.status(404).send({"error":err});
						})
			}
		);

// 4. Create a new recipe
app.get('/recipe/new',
			(req,res)=>{
				res.render('recipenew');
			}
		);

// 5. Store a recipe
// NOTE stringifying the body definitely required, as well as the headers part (verified)
app.post('/recipe/new',
			(req,res)=>{
				let newRecipe=JSON.stringify(req.body);
				console.log("New recipe: ",newRecipe);
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes",
					{method:'post',
					 headers:{'Accept': 'application/json','Content-Type': 'application/json'},
					 body: newRecipe}
					)
				.then(
					(response)=>{
						return response.json();
					})
				.then(
					(data)=>{
						console.log("Received new recipe data: ",data);
						res.redirect('/recipes'); // show the recipes again
					})
				.catch(
					(err)=>{
						res.status(404).send({"error":err});
					})
			}
		);

// Update a recipe
app.post('/recipe/update',
			(req,res)=>{
				console.log("Recipe update: ",req.body);
				recipeId=req.body._id;
				delete req.body._id; // don't pass along to the backend server
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+recipeId,{method:'put',body:req.body})
				.then(
					(response)=>{
						return response.json();
					})
				.then(
					(recipe)=>{
						console.log("Recipe after update: ",recipe);
						res.redirect('/recipedetails',{recipe:recipe}); // show the recipes again
					})
				.catch(
					(err)=>{
						res.status(404).send({"error":err});
					})
			}
		);		

// Delete a recipe
app.get('/recipes/:recipeId/delete',
			(req,res)=>{
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+req.params.recipeId,{method:'delete'})
				.then(
					(response)=>{
						return response.json();
					})
				.then(
					(data)=>{
						console.log("Received data: ",data);
						res.redirect('/recipes'); // show the recipes again
					})
				.catch(
					(err)=>{
						res.status(404).send({"error":err});
					})
		}
);

// Run the frontend server
app.listen(FRONTEND_SERVER_PORT,()=>{console.log("Front-end server is listening on port "+FRONTEND_SERVER_PORT+".");});



