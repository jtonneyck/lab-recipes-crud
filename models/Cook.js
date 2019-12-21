const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Cook = mongoose.model("cooks", new Schema ({ // "cooks" should be same as ref in "creator: { type: ObjectId, ref: 'cooks'}"
  name: { type: String },
  image: { type: String }
}))

module.exports = Cook;