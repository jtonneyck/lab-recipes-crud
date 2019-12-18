const express = require("express");
const app = express();
const Cook = require("../models/Cook");

app.get("/detailedCook", (req,res)=> {
    let cookId = req.query.id
    Cook.findById(cookId)
        .then((cook)=> {
            res.render("cooks/detailedCook.hbs", { cook: cook });
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app