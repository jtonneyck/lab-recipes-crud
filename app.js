const express = require("express");
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// set up handlebars
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
hbs.registerPartials(__dirname + '/views/recipes');
app.use("/", require("./routes/recipes"));
// app.use("/recipes", require("./routes/recipes-detail"));
// app.use("/recipes-detail", require("./routes/delete-recipe"));
// app.use("/create-recipe", require("./routes/create-recipe"));
app.set("PORT", 3000);
app.listen(app.get("PORT"), () => {
    console.log("Webserver is listening");
})
mongoose
    .connect('mongodb://localhost/recipe-app-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));