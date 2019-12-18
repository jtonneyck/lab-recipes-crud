const express = require("express");
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const session = require('express-session')
const sessionOptions = {
    secret: 'keyboard cat', // don't change it for now. This decides how your sid is going to be created
    cookie: {}
}

app.use(session(sessionOptions));





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

// protection middleware. If the user isn't logged in, redirect. If the user IS logged in proceed tot the next route/middleware
function protect(req,res, next) {
    if(req.session.currentUser) next();
    else res.redirect("/user/login");
}

//routing
app.use("/", require("./routes/index.js"));

app.use("/recipes", protect) // if the list recipes is protected, should you also protect the detailed list?
app.use("/create-recipe", protect)
app.use("/cooks", protect) // if the list of cooks is protected, should you also protect the detailed list?
app.use("/create-cook", protect)
//if not logged in, then I get following message: "Cannot GET /user/login". How to solve this?

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

app.use("/", require("./routes/user.js"));



app.listen(3000, ()=> {
    console.log("Webserver is listening");
});