const mongoose = require('mongoose');
const express = require('express');

const Schema = mongoose.Schema;
// const recipesSchema = new Schema({
//     title: { type: String, required: true },
//     level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
//     ingredients: { type: [String] },
//     cuisine: { type: String },
//     dishType: { type: String, enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'] },
//     image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
//     duration: { type: Number, min: 0 },
//     creator: { type: String },
//     created: { type: Date, default: Date.now }
// })

const recipesSchema = new Schema({
    title: { type: String},
    level: { type: String },
    ingredients: { type: String },
    cuisine: { type: String },
    dishType: { type: String },
    image: { type: String },
    duration: { type: String },
    creator: { type: String },
    created: { type: String }
})

const Recipe = mongoose.model('recipe', recipesSchema);

module.exports = Recipe;

