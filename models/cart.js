const mongoose = require('mongoose');
const CartScheme = new mongoose.Schema({
    userid:{ type:String, required:true },
    products: [
        {
            productid:{ type:String, required:true },
            quantity:{ type:Number, default:1 },
            

        }
    ],
    
    

}

    ,{timestamps:true})
module.exports = mongoose.model('Cart',CartScheme);