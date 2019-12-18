const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();


let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};



mongoose.connect("mongodb://localhost:27017/restaurant", options, (err, connectionInfo) => {
    if(err) console.log(err);
    else console.log("connected to database")
});



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set("views", __dirname + "views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "public"));



//routing
app.use("/", require("./routes/index.js"));
app.use("/", require("./routes/recipes.js"));
app.use("/", require("./routes/detailedRecipe.js"));
app.use("/", require("./routes/createRecipe.js"));
app.use("/", require("./routes/deleteRecipe.js"));
app.use("/", require("./routes/editRecipe.js"));

app.use("/", require("./routes/cooks.js"));
app.use("/", require("./routes/detailedCook.js"));
app.use("/", require("./routes/createCook.js"));
app.use("/", require("./routes/deleteCook.js"));
app.use("/", require("./routes/editCook.js"));



app.listen(3000, ()=> {
    console.log("Webserver is listening");
});