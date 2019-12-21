const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.render("index.hbs")
})


module.exports = app