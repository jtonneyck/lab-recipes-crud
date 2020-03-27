//Setting up all the DEPENDENCIES
const express = require("express");
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
const path = require('path');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//Setting up MONGOOSE
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((connectionInfo)=> {
    console.log('Successfully connected to the recipes database!')
  })
  .catch((error) => {
    console.log('Error - unsuccessfully connected to the recipes database!', error)
  })

//Importing the files
app.use("/", require("./routes/index"));
app.use("/", require("./routes/recipes"));
app.use("/", express.static('public'));

app.listen(3000, () => console.log('🏃‍ on port', 3000));