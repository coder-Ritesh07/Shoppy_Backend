const mongoose = require("mongoose");
// this is a cartSchema or structure of carts Collection
const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, required: true,
 },
  productId: {
    type: String,
    required: true,
  },
  quantities: { type: Number, required: true },
  
},{timestamps:true});


const cart = mongoose.model("Cart", cartSchema);
module.exports = { cart };
