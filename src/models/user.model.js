const { appconfig } = require("../config");
//Para pasar el virtual como Json

const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  city: String,
  address: String,
  phone: Number,
  avatarFilename: String,
});

userSchema.virtual("avatarUrl").get(function () {
  const { port, host } = appconfig;
  return `http://${host}:${port}/public/${this.avatarFilename}`
})

module.exports = mongoose.model("User", userSchema);




