const mongoose=require('mongoose')
const {products}=require('../models/Products')

// here we fetch the all data from products collection
const fetchProducts=async(req,res)=>{
    try {
        // fetch the all data and check 
        let items=await products.find()
        if(!items)
        {
            return res.status(404).json({messege:"Products are Empty"})
        }
        return res.status(200).json(items)
    } catch (error) {
        res.status(401).json({error:"Products Not Found"})
    }
}
// fetch the data by using the products id by using the dynamic route
const fetchProductsById=async(req,res)=>{
    try {
     let getItemsById=await products.findById(req.params.id)
     if(!getItemsById)
     {
        return res.status(404).json({messege:"Product Id Not Defined"})
     }
     return res.status(200).json(getItemsById)
    } catch (error) {
     res.status(401).json({error:"Products Not Found"})
    }
 }

 module.exports={
    fetchProducts,
    fetchProductsById
 }