const express = require("express");
const app = express();
const User = require("../models/user"); // user model


app.get("/login", (req, res, next) => {
  res.render("user/login");
});

app.post("/login", (req, res, next) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;
  
    if (theUsername === "" || thePassword === "") {
      res.render("user/login", {
        errorMessage: "Please fill in both username and password to log in."
      });
      return;
    }
  
    User.findOne({ "username": theUsername })
    .then(user => {
        if (!user) {
          res.render("user/login", {
            errorMessage: "The username doesn't exist."
          });
          return;
        }
        if (thePassword, user.password) {
          // Save the login in the session!
          // req.session.currentUser = user;
          res.redirect("/");
        } else {
          res.render("user/login", { errorMessage,
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });

module.exports = app;
