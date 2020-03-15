const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeModel = new Schema ({
    title: String,
    level: String,
    ingredients: Array,
    cuisine: { type: String, required: true }, // is this who we must write this?
    dishType: String,
    image: { type: String, default: 'https: //images.media-allrecipes.com/images/75131.jpg' },
    duration: {type: Number, min: 0},
    creator: String
})

const Recipe = mongoose.model("recipes", recipeModel);

module.exports = Recipe;






