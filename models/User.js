const mongoose = require("mongoose");
const Schema = mongoose.Schema


const User = mongoose.model("users", new Schema ({
  username: { type: String, required: true },
  password: { type: String, required: true }
}))

module.exports = User;