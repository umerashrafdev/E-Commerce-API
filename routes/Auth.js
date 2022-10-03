const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

//Register
router.post('/register',async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.Password).toString(),
        username: req.body.username,
    })
    await user.save().then(() => {
        res.send({
            message: 'User created successfully'
        })
    }).catch((error) => {
        res.status(400).send(error)
    })
    

})


router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(400).send({
                message: 'User not found'
            })
        }
        const hasd = CryptoJS.AES.decrypt(user.password, process.env.Password).toString(CryptoJS.enc.Utf8)
        if(hasd !== req.body.password){
            res.status(400).send({
                message: 'Password is incorrect'
            })
        }else{
            const { password, ...others } = user._doc;
            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
                process.env.jwtt,
                {expiresIn: '3d'},);
            res.json({...others,token} )
        }
    }catch(error){
        res.status(400).send(error)
    }
    

})
module.exports = router;