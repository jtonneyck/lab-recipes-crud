const express = require("express");
const mongoose = require("mongoose");
const app = express();
const hbs = require("hbs");
const path = require("path");

// set up handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//register partials
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/recipe");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//home route
app.get("/", (req, res) => {
  res.render("home");
});

//list all recipes
app.use("/", require("./routes/recipes"));

//recipe detail
app.use("/", require("./routes/detail"));

//delete a recipe
app.use("/", require("./routes/delete"));

//creates a recipe
app.use("/", require("./routes/create"));

//update a recipe
app.use("/", require("./routes/update"));

//search a recipe
app.use("/", require("./routes/search"));

//search a recipe
app.use("/", require("./routes/filter"));

app.listen(3000, () => {
  console.log("Webserver is listening");
});
