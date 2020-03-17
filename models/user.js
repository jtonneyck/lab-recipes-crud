const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersModel = new Schema({
  username: String,
  password: String
});

const User = mongoose.model("users", usersModel);

module.exports = User;
