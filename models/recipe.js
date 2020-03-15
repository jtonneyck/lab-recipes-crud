const mongoose = require("mongoose");
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title:String,
    ingredients:[String],
    level:String,
    creator:String,
    cuisine:String,
    image:String,
    duration:Number
})

const Recipe = mongoose.model("recipes", recipeSchema)

module.exports = Recipe;