const express = require("express");
const hbs = require("hbs")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const app = express();


mongoose.connect('mongodb://localhost:27017/recipesDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> {
    console.log("Connected to database");
})
.catch((error)=> {
    console.log("Not connected to database, error:", error);
})

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + '/public'));

app.use("/", require("./routes/recipes"));


app.listen(3000, () => {
    console.log("Webserver is listening");
})