
const express = require("express");
const app = express();
const Cook = require("../models/Cook");



app.get("/cooks/delete/:id", (req,res)=> {
    let cookId = req.params.id
    Cook.findByIdAndDelete(cookId)
        .then(() => {
            res.redirect("/cooks")
        })
        .catch(err => console.log(err));
});



module.exports = app;