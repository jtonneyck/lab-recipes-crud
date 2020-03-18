const mongoose = require("mongoose");

const Recipe = mongoose.model("recipes", {   
    title: String,
    cuisine: String,
    image: String,
    ingredients: [String],
    level: String,
    dishType: String,
    duration: Number,
    creator: String
})

module.exports = Recipe;