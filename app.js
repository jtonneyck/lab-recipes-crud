const express = require('express');
const app = express();
const mongoose = require('mongoose');

// bodyparser for the input
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', __dirname + '/views');

app.set('view engine', 'hbs');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'))

mongoose
    .connect('mongodb://localhost/recipe-app', { useNewUrlParser: true, useUnifiedTopology:true })
    .then(data => console.log(`Connected to Mongo! Database name: "${data.connections[0].name}"`))
    .catch(error => console.error('Error connecting to mongo', error));

app.use('/', require("./routes/home"));
app.use('/', require("./routes/recipes/recipes"));
app.use('/', require("./routes/recipes/details"));
app.use('/', require("./routes/recipes/delete"));
app.use('/', require("./routes/recipes/create"));
app.use('/', require("./routes/recipes/edit"));

app.listen(3000, () => {
    console.log('3000, up and running!');
});