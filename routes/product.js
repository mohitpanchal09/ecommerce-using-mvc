const express = require('express');
const router = express.Router()
const Product = require('../models/Product')


//get all products
router.get('/products',async(req,res)=>{
    let products=await Product.find()
    res.render('index',{products})
})


//new product form

router.get('/product/new',(req,res)=>{
    res.render('new')
})

// to actually add the product
router.post('/products',async (req,res)=>{
    let {name,img,desc,price}= req.body
    await Product.create({name,img,desc,price})
    res.redirect('/products')
})

//get single products
router.get('/product/:id',async(req,res)=>{
    let {id} = req.params
    let product = await Product.findById(id)
    res.render('show',{product})
})



module.exports = router