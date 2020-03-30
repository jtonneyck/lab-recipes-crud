const express = require("express");
const app = express();

//instead of :
// app.use('/recipes', (req, res, next) => {
//   if (req.session.currentUser) { 
//     next(); 
//   } else {                         
//     res.redirect("login");
//   }
// });
// shorter : function that check user log in passed as an argument in app.get

const protect = (req, res, next) => {
  if (req.session.currentUser) { 
    next(); 
  } else {                         
    res.redirect("user/login");
  }
}
app.get("/intro", protect, (req, res, next) => res.render("intro"));

module.exports = app;


