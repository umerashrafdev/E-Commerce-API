const mongoose = require('mongoose');
const UserScheme = new mongoose.Schema({
    username:{ type:String, required:true ,unique:true},
    password: { type:String, required:true},
    email: { type:String, required:false},
    phone:{ type:String, required:false},
    isAdmin:{ type:Boolean, default:false},
    address: { type:String, required:false},
    

}

    ,{timestamps:true})
module.exports = mongoose.model('User',UserScheme);