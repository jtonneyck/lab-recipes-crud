// TypeError: Router.use() requires a middleware function but got a Object --> don't forget "module.exports = app;"

const express = require("express");
const app = express();
const User = require("../models/user");

//SIGN UP

//Setup url as first argument and render function as second argument. Pass in the view engine (hbs) file. What exactly happens here?
app.get("/signup", (req, res) => {
    res.render("user/signUp.hbs")
})

//
app.post("/signup", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((user) => {
        res.redirect("/login")
    })
    .catch((error) => {
        res.render(("error", error))
    })
})


//SIGN IN

//Setup url as first argument and render function as second argument. Pass in the view engine (hbs) file.
app.get("/login", (req, res) => {
    res.render("user/login.hbs")
})

app.post("/login", (req, res) => {
    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user) res.status(403).send("INVALID")
        else if (user.password === req.body.password) { // password in database user  === typed password
            req.session.currentUser = user;
            //res.send("Logged in")
            res.redirect("/") // hoort dit zo???

        }
        else {
            res.status(403).send("INVALID")
        }
    })
})


//SIGN OUT
//app.get()

module.exports = app;