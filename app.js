const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials");

mongoose
    .connect('mongodb://localhost:27017/recipe-app-dev', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("connected to the database");
    })
    .catch((error) => {
        console.log(error);
    })

app.set("PORT", 3000);
app.set("view engine", "hbs");

app.use("/recipes", require("./routes/recipes"));

app.listen(app.get("PORT"), ()=> {
    console.log("app listening on", app.get("PORT"));
})