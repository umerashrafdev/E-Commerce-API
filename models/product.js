const mongoose = require('mongoose');
const ProductScheme = new mongoose.Schema({
    title:{ type:String, required:true ,unique:true},
    desc: { type:String, required:true},
    img: { type:String, required:false},
    price:{ type:Number, required:false},
    category: { type:Array, required:false},
    size : { type:String, required:false},
    color : { type:String, required:false},
    quantity : { type:String, required:false},
    

}

    ,{timestamps:true})
module.exports = mongoose.model('Product' ,ProductScheme);