const express = require("express");
const app = express();
const Cook = require("../models/Cook");



//GET method + PARAMS
app.get("/edit-cook/:id", (req, res) => {
    let cookId = req.params.id
    Cook.findById(cookId)
        .then((cook) => {
            res.render("cooks/editCook.hbs", { cook: cook })
        })
        .catch(err => console.log((err)))
})



//POST method 
app.post("/edit-cook/:id", (req, res) => {
    let cookId = req.params.id
    let editCook = {
        name: req.body.name,
        image: req.body.image,
    }

    Cook.findByIdAndUpdate(cookId, editCook, {new:true})
    .then((newCook) => {
        res.redirect(`/detailedCook?id=${newCook.id}`)
    })
    .catch(err => console.log(err))
})

module.exports = app