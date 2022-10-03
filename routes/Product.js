const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Product = require('../models/product');
const {veryfyToken ,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../routes/Verifytoken');


router.post('/add',verifyTokenAndAdmin, async (req, res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/update/:id", verifyTokenAndAdmin, async (req, res,next) => {
 

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
try{
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'User deleted successfully'});
}catch(err){
    res.status(500).json(err);
}});


router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
try{
    const prouduct = await Product.findById(req.params.id);
    
    res.json(prouduct);
}catch(err){
    res.status(500).json(err);
}

})

router.get("/find", verifyTokenAndAdmin, async (req, res) => {
   const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }

})



module.exports = router