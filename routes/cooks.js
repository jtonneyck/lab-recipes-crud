const express = require("express");
const app = express();
const Cook = require("../models/Cook");

app.get("/cooks", (req,res)=> {
    Cook.find({})
        .then((cooks)=> {
            res.render("cooks/listCook.hbs", {cooks: cooks });
        })
        .catch((err)=> {
            res.render("error", err);
        })
})

module.exports = app