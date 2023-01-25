var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  timestamp: { type: String, require: true, max: 100 },
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 100 },
  code: { type: String, require: true, max: 100 },
  thumbnail: { type: String, require: true, max: 100 },
  price: { type: String, require: true, max: 100 },
  stock: { type: String, require: true, max: 100 },
});

module.exports = mongoose.model("Product", ProductSchema);
