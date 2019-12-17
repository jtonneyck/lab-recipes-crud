const express = require("express");
const app = express();
const hbs = require("hbs")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost:27017/restaurant", options, (err, connectionInfo) => {
    if(err) console.log(err);
    else console.log("connected to database")
})

app.use("/recipes", require("./routes/recipes"));


app.listen(3000, ()=> {
    console.log("Webserver is listening");
})