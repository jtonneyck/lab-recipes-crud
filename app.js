const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

mongoose
    .connect('mongodb://localhost:27017/recipe-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.log(err)
    })

app.use("/", require("./routes/home"));
app.use("/", require("./routes/recipes"));
app.use("/", require("./routes/detail"));
app.use("/", require("./routes/delete"));
app.use("/", require("./routes/create"));
app.use("/", require("./routes/update"));
app.use("/", require("./routes/level"));
app.use("/", require("./routes/dish"));

app.listen(3000, ()=> {
    console.log("Webserver is listening", 3000);
})