const express = require("express");
const hbs = require("hbs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') // require package cookie parser
const mongoose = require("mongoose")
const session    = require("express-session"); //adds package to use sessions (Cookies)
const MongoStore = require("connect-mongo")(session); //adds package to store session in mongo
const cookie = require('cookie'); //require cookie package
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
app.use(cookieParser()) //require cookie parser package
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + '/public'));


app.use("/", require("./routes/index"));
app.use("/", require("./routes/recipes"));
app.use("/", require("./routes/oneRecipe"));
app.use("/", require("./routes/editRecipe"));
app.use("/", require("./routes/signup"));
app.use("/", require("./routes/login"));

// middleware to enable sessions in express
app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
// 

app.listen(3000, () => {
    console.log("Webserver is listening");
})