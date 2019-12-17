const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Recipe = mongoose.model("recipes", new Schema ({
    title: String,
    level: String,
    ingredients: [String],
    cuisine: String,
    dishType: String,
    image: String,
    duration: Number, 
    creator: String 
}))

module.exports = Recipe;