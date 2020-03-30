require("dotenv").config() //env config
const express = require("express");
const cookieParser = require("cookie-parser") // require package cookie parser
const hbs = require("hbs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session    = require("express-session"); //adds package to use sessions (Cookies)
const MongoStore = require("connect-mongo")(session); //adds package to store session in mongo
const cookie = require("cookie"); //require cookie package
const app = express();

app.use(cookieParser())

mongoose.connect(process.env.db , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> {
  console.log("process.env.db", process.env.db)
    console.log("Connected to database");
})
.catch((error)=> {
    console.log("Not connected to database, error:", error);
})
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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) //require cookie parser package
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public/"));
app.use(express.static(("/uploads/")))


app.use("/", require("./routes/intro"));
app.use("/", require("./routes/recipes"));
app.use("/", require("./routes/oneRecipe"));
app.use("/", require("./routes/editRecipe"));
app.use("/", require("./routes/signup"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/homepage"));
app.use("/", require("./routes/create"));




app.listen(process.env.PORT, () => {
    console.log("Webserver is listening");
})