const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeModel = new Schema ({
    title: String,
    cuisine: { type: String, required: true }, // is this who we must write this?
    image: { type: String, default: 'https: //images.media-allrecipes.com/images/75131.jpg' }
})

const Recipe = mongoose.model("recipes", recipeModel);

module.exports = Recipe;






