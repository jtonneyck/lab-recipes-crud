const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

const recipesRoute = require("./routes/list");
const detailsRoute = require("./routes/details");
const deleteRoute = require("./routes/delete");
const createRoute = require("./routes/create");
const updateRoute = require("./routes/update");
const cuisineRoute = require("./routes/cuisine");

const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
hbs.registerPartials(__dirname + '/views/partials');

const Recipe = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
    .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });

app.use("/", recipesRoute);
app.use("/", detailsRoute);
app.use("/", deleteRoute);
app.use("/", createRoute);
app.use("/", updateRoute);
app.use("/", cuisineRoute);
    

app.listen(3000, ()=> {
    console.log("Webserver is listening");
})