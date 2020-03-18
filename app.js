const express = require("express");
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({ extended: false }))

//route
app.use("/", require("./routes/recipes"));

//DB connection
mongoose.connect('mongodb://localhost/recipe-app-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((connectionInfo) => {
        console.log("connected to recipe-app-dev DB");
    })
    .catch((error) => {
        console.log("ERROR ERROR", error);
    });

//listener
app.listen(3000, () => {
    console.log("Webserver is listening");
})