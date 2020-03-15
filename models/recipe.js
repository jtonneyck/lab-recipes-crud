const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
    title: String,
    ingredients: Array,
    dishType: String,
    level: String,
    image: String,
    duration: String,
    creator: String,
    cuisine: String,
    
});


const Recipe = mongoose.model("recipes", RecipesSchema)



// module.exports = app;
module.exports = Recipe;