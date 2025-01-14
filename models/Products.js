const mongoose = require("mongoose");
// this is a Productschema or structure of products Collection
let productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    stock:{
        type:Number,
        require:true
    }
})

let products=mongoose.model('product',productSchema)

module.exports={
    products
}