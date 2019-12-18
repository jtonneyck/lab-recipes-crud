const express = require("express");
const app = express();
const Cook = require("../models/Cook");



app.get("/create-cook", (req, res) => {
    res.render("cooks/createCook.hbs")
})

app.post("/create-cook", (req, res) => {
    let newCook = {
        name: req.body.name,
        image: req.body.image,
        
    }

    Cook.create(newCook)
    .then(() => {
        res.redirect("/cooks")
    })
    .catch(err => console.log(err))
})


module.exports = app