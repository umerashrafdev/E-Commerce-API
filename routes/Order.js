const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Order = require('../models/order');
const {veryfyToken ,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../routes/Verifytoken');


router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    const order = new Order(req.body);
    try{
        await order.save();
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/update/:id", verifyTokenAndAdmin, async (req, res,next) => {
 

  try {
    const updatedorder = await Order.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.status(200).json(updatedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'User deleted successfully'});
}catch(err){
    res.status(500).json(err);
}});


router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
try{
    const orders = await Order.find({userid: req.params.userid});
    
    res.json(orders);
}catch(err){
    res.status(500).json(err);
}

})

router.get("/adminfind", verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/income",verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date();
    const LastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const PrevousMonth = new Date(new Date().setMonth(LastMonth.getMonth()-1));
    try{
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:PrevousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                }
            },
            {$group:{_id:"$month",total:{$sum:"$sales"}}},
            
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router