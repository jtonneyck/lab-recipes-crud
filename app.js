const BACKEND_SERVER_PORT=2996;
const FRONTEND_SERVER_PORT=3003;

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
/*
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
*/
hbs.registerHelper({
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function () {
        return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});

const path=require('path');

app.set('view engine','hbs');

app.set('views',path.join(__dirname,'views'));

hbs.registerPartials(path.join(__dirname,"views/partials"));

// tell express where the static content is located
// NOTE I had app.set(express.static,path.join(__dirname,"public")) here but that didn't work, this does
app.use(express.static(path.join(__dirname,"public")));

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

var message=""; // leave a message

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
							// show sorted on by title
							data={recipes:recipes.sort(function(a,b){return(a.title>b.title?1:-1);})};
							if(message)data.message=message; // have we got a message to show????
							res.render('recipes',data);
						})
					.catch(
						(err)=>{
							res.status(404).send("ERROR: '"+err.toString()+"' trying to show all recipes.");
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
							//////console.log("Received recipe: ",recipe);
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
				let recipeId=req.query._id;
				console.log("Recipe '"+recipeId+"' update: ",req.body);
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+recipeId,
					{method:'put',
					headers:{'Accept': 'application/json','Content-Type': 'application/json'},
					body:JSON.stringify(req.body)
					})
				.then(
					(response)=>{
						return response.json();
					})
				.then(
					(recipe)=>{
						/////////console.log("Recipe after update: ",recipe);
						res.redirect('/recipedetails',{recipe:recipe}); // show the recipes again
					})
				.catch(
					(err)=>{
						message=err.message;
						res.status(404).send({"error":err});
					})
			}
		);		

// Delete a recipe
app.get('/recipe/:recipeId/delete',
			(req,res)=>{
				console.log("Deleting the recipe with id '"+req.params.recipeId+"'.");
				fetch('http://localhost:'+BACKEND_SERVER_PORT+"/recipes/"+req.params.recipeId,{method:'delete'})
				.then(
					(response)=>{
						return response.json();
					})
				.then(
					(data)=>{
						message=data.message;
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



