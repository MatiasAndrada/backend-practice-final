var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  total: { type: Number, default: 0 },
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      priceAmount: { type: Number, default: 0 },
    },
  ]
}
);

//virtual items length
CartSchema.virtual("itemsCount").get(function () {
  return this.items.length;
});

CartSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model("Cart", CartSchema);
