const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recipeModel = new Schema ({
    title: String,
    level: String,
    ingredients: Array,
    cuisine: String, 
    dishType: String,
    image: 
        { data: Buffer, contentType: String },

    duration: {type: Number, min: 0},
    creator: String,
    file_upload: String
})

const Recipe = mongoose.model("recipes", recipeModel);

module.exports = Recipe;






