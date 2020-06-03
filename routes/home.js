const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.render('home');
});

module.exports = app