const express = require('express')
const User = require('../models/User')
const { isLoggedIn } = require('../middleware')
const router = express.Router()

router.get('/user/cart',isLoggedIn,async(req,res)=>{
    let userId = req.user._id
    let user = await User.findById(userId).populate('cart')
    let cart = user.cart
    res.render('cart/cart',{cart})
})

router.post('/user/:productId/add',isLoggedIn,async(req,res)=>{
    let userId = req.user._id
    let user = await User.findById(userId)
    user.cart.push(req.params.productId)
    await user.save()
    res.redirect('/user/cart')
})
router.delete('/user/:productId/delete',isLoggedIn,async(req,res)=>{
    try{
    let userId = req.user._id
    let user = await User.findById(userId)
    user.cart = user.cart.filter((item)=>{
        if(!item.equals(req.params.productId)){
            return item
        }
    })
    await user.save()
    res.redirect('/user/cart')
    }catch(err){
        req.flash('error',err)
    }
})

module.exports = router