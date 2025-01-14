const express = require("express");
let cartRoute = express.Router();
const {addToCart,updateCart,deleteCart}=require("../controllers/Cartcontroller");
const { jwtAuthenticationMiddleware } = require("../utils/Jwt");


// add the jwtAuthenticationMiddleware method to every /cart for authentication
cartRoute.post("/cart",jwtAuthenticationMiddleware, addToCart);
cartRoute.put("/cart/:id",jwtAuthenticationMiddleware,updateCart );
cartRoute.delete("/cart/:id",jwtAuthenticationMiddleware,deleteCart );

module.exports = {
  cartRoute,
};
