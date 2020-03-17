const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CooksModel = new Schema({
  name: String,
  image: String
});
const Cook = mongoose.model("cooks", CooksModel);
module.exports = Cook;
