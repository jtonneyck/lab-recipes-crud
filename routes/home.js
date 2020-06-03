const express = require("express");
const app = express();
const Recipe = require("../models/recipe");

app.get("/", (req, res)=>{
    res.render("home")
})

module.exports = app;