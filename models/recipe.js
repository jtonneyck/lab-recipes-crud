const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    title: String,
    cuisine: String,
    image: String
})


const Recipe = mongoose.model("recipe", recipeSchema)

module.exports = Recipe;