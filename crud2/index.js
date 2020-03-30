const express = require("express");
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")


const recipes = require('./routes/recipe');
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.json()); //Used to parse JSON bodies
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use('/recipes',recipes);

mongoose.connect('mongodb://localhost:27017/recipe-app-dev', { useNewUrlParser: true}, (err) => {

    if(!err) { console.log('MongoDB connection succeeded.')}

    else { console.log(`Error in DB connection: ${err}`)}

});

hbs.registerPartials(__dirname + '/views/partials');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

