const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://localhost:27017/recipe-app-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => {
    console.log('Error connecting to mongo', error);
  });

  // set up handlebars
app.use('/', require('./routes/recipes'));


app.set('view engine', 'hbs');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('PORT', 3000);
app.listen(app.get('PORT'), () => {
  console.log('Listening to port 3000.');
});
