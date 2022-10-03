const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Cart = require('../models/cart');
const {veryfyToken ,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../routes/Verifytoken');


router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    const cart = new Cart(req.body);
    try{
        await cart.save();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/update/:id", verifyTokenAndAuthorization, async (req, res,next) => {
 

  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'User deleted successfully'});
}catch(err){
    res.status(500).json(err);
}});


router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
try{
    const cart = await Cart.find({userid: req.params.userid});
    
    res.json(cart);
}catch(err){
    res.status(500).json(err);
}

})

router.get("/adminfind", verifyTokenAndAdmin, async (req, res) => {
    try{
        const cart = await Cart.find();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router