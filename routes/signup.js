const express = require("express");
const app = express();
const User = require("../models/user"); // user model

// Render sign up form

app.get("/signup", (req, res) => {
  res.render("user/signup");
});

// Create user

app.post("/signup", (req, res) => {
  //   const username = req.body.username;
  //   const password = req.body.password;

  const { username, password } = req.body; // shortcut expr
  if (username === "" || password === "") {
    res.render("user/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }
  User
    .create({ username, password })
    .then(user => {
      res.redirect("user/login");
    })
    .catch(err => {
      res.send("user not created", err);
    });
  
});



module.exports = app;
