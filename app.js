const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe.model');
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
 
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
 

  Recipe.insertMany(data)
    .then( (dataInput) => {
      return Recipe.find()
        .select("title")
        .then(checkData => { console.log('The recipes are ', checkData) })
    })
    .catch(err => console.log(`Error while creating a new cat: ${err}`))
    
    
    .then(() => {  
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((updateData) => {
        console.log(`the updateRecipe${ updateData.title}`)
      })
      .catch((err) => {
        console.log(`Error while creating a new cat: ${err}`)
      })
    })
    
   app.use('/', require("./routes/home"));

app.listen(3010, () => console.log('App listening on port 3000!'))
