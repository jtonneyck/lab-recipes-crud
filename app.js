const express = require("express");
const app = express()
app.set('view engine', 'hbs');
const mongoose = require('mongoose');
app.set("PORT", 3002)
mongoose.connect('mongodb://localhost/recipe-app-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to db")
    })
    .catch((error) => {
        console.log("error db", error)
    })
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use("/", require("./routes/index"))
app.use("/", require("./routes/recipes"))
app.use("/", require("./routes/recipedetail"))
    // app.use("/", require("./routes/update"))




app.listen(app.get("PORT"), () => {
    console.log("running on port 3002")
})








// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const recipeSchema = new Schema({
//     title: ObjectId,
//     level: String,
//     cuisine: String,
//     dishType: String,
//     image: String
// });
// const recipeModel = mongoose.model("recipes", recipeSchema);