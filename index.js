const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

const recipesRoute = require('./routes/recipes');
const detailsRoute = require('./routes/details');
const deleteRoute = require('./routes/delete');
const createRoute = require('./routes/create');
const updateRoute = require('./routes/update');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connections[0].name}"`);
    return x.connection.dropDatabase();
  })
  .then(x => {
    return Recipe
    .insertMany(data)
    .then(recipe=>{
      // console.log("New recipie added", recipe)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

app.use("/", recipesRoute)
app.use("/", updateRoute)
app.use("/", detailsRoute)
app.use("/", deleteRoute)
app.use("/", createRoute)


app.listen(3000, () => console.log("App listening on port 3000"));
  