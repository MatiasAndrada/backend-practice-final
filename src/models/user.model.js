const { appConfig } = require("../config");
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
  const { port, host } = appConfig;
  return `http://${host}:${port}/public/${this.avatarFilename}`
})
//virtual a json
userSchema.set("toJSON", {
  virtuals: true,
});


module.exports = mongoose.model("User", userSchema);




