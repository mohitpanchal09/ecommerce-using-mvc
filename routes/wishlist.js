const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {isLoggedIn} = require('../middleware')

router.post('/products/:productId/like',isLoggedIn,async(req,res)=>{
    let productID = req.params.productId
    const isLiked=req.user.wishlist.includes(productID)
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:productID}})
        res.send('unliked')
    }else{
        await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:productID}})
        res.send('liked')
    }
})

module.exports=router