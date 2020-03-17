const express = require("express");
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
// set up handlebars
const hbs = require('hbs')
hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine', 'hbs');

mongoose
    .connect('mongodb://localhost/recipe-app-dev', {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then((db)=>{
        console.log('connection to database made')
    })
    .catch(err=>{
        console.log('error connecting to DB', err)
    })


app.use('/', require('./routes/index'))
app.use("/", require("./routes/recipes"));
app.use('/', require('./routes/recipe-information'))
app.use('/', require('./routes/deletion'))


app.listen(3000, ()=> {
    console.log("Webserver is listening", 3000);
})