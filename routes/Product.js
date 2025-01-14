const express=require('express')
const {fetchProducts,fetchProductsById} =require('../controllers/Product')
let productRouters=express.Router();

// here all are Products Api routes ,we can fetch the data from products collection from MongoDB
productRouters.get('/products',fetchProducts)
productRouters.get('/products/:id',fetchProductsById)

module.exports={
    productRouters
}