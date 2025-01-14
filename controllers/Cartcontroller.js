const mongoose = require("mongoose");
const { cart } = require("../models/Cart");
const { products } = require("../models/Products");
const { ObjectId } = mongoose.Types;

const addToCart = async (req, res) => {
  try {
    let { productId, quantities } = req.body;
    console.log(productId, quantities);
    // add Auth
    let userId = req.user.userId;
    // console.log("userId=",userId)
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product Id" });
    }
    let findProId = await products.findOne({ _id: productId });
    if (!findProId) {
      return res.status(404).json({ messege: "Product Id Not Match" });
    }
    // console.log(findProId);
    let newCart = new cart({ productId: productId, quantities,userId});
    await newCart.save();
    return res.json(newCart);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Cart Page Not Found" });
  }
};
const updateCart = async (req, res) => {
  try {
    let paramsId = req.params.id;
    let userId = req.user.userId;
    // console.log(userId); // Log the userId for debugging

    // Ensure paramsId is a valid ObjectId
    if (!ObjectId.isValid(paramsId)) {
      return res.status(400).json({ message: "Invalid Cart Item Id" });
    }
    // Find the cart item by productId and userId
    let searchId = await cart.findOne({ productId: paramsId, userId: userId });
    if (!searchId) {
      return res.status(404).json({ message: "Cart item not found for this user" });
    }
    // Update the cart item
    let updateId = await cart.findOneAndUpdate(
      { _id: searchId._id, userId: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updateId) {
      return res.status(404).json({ message: "Cart item not updated" });
    }

    return res.json(updateId);
  } catch (error) {
    // console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    // store paramsId
    let paramsId = req.params.id;
    // console.log(paramsId);
    let userId = req.user.userId;
    if (!ObjectId.isValid(paramsId)) {
      return res.status(400).json({ message: "Invalid Product Id" });
    }
    // in this case by using this method we can direct delete the cart from cart collection
    let dltCart = await cart.findOneAndDelete({ productId: paramsId,userId });
    if (!dltCart) {
      return res.status(404).json({ messege: "Delete Cart Is Not Found" });
    }
    return res.json({ messege: "Cart Delete Successfully" });
  } catch (error) {
    res.status(500).json({ messege: "Internal server Error" });
  }
};

module.exports = {
  addToCart,
  updateCart,
  deleteCart,
};
