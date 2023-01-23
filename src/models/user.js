const { appconfig } = require("../config");
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = Schema({
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
  avatarUrl: String,
});

userSchema.methods.setAvatarUrl = function setAvatarUrl (filename){
	const {port, host} = appconfig;
	this.avatarUrl = `${host}:${port}/public/${filename}`

}


module.exports = mongoose.model("User", userSchema);
	 

