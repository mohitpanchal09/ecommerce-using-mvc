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
    let product = await Product.findById(id).populate('reviews')
    console.log(product)
    res.render('show',{product})
})

//to show edit form
router.get('/product/:id/edit',async(req,res)=>{
    let {id} = req.params
    let product = await Product.findById(id)
    res.render('edit',{product})
})

//to actually edit the form
router.patch('/products/:id',async(req,res)=>{
    let {id} = req.params
    let {name,desc,img,price} = req.body
    await Product.findByIdAndUpdate(id,{name,desc,img,price})
    res.redirect('/products')
})

// to delete a product
router.delete('/products/:id',async(req,res)=>{
    let {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

module.exports = router