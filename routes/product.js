const express = require('express');
const router = express.Router()
const Product = require('../models/Product')
const {productValidate, isLoggedIn, isProductAuthor} = require('../middleware')

//get all products
router.get('/products',async(req,res)=>{
    try{
    let products=await Product.find()
    res.render('products/index',{products})
    }catch(err){
        res.render('error',{err})
    }
})


//new product form

router.get('/product/new',isLoggedIn,(req,res)=>{
    res.render('products/new')
})

// to actually add the product
router.post('/products',productValidate,async (req,res)=>{
    try{
    let {name,img,desc,price}= req.body
    await Product.create({name,img,desc,price})
    res.redirect('/products')
    }
    catch(err){
        res.render('error',{err})
    }
})

//get single products
router.get('/product/:id',async(req,res)=>{
    try{
    let {id} = req.params
    let product = await Product.findById(id).populate('reviews')
    res.render('products/show',{product})
    }catch(err){
        res.render('error',{err})
    }
})

//to show edit form
router.get('/product/:id/edit',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
    let {id} = req.params
    let product = await Product.findById(id)
    res.render('products/edit',{product})
    }catch(err){
        res.render('error',{err})
    }
})

//to actually edit the form
router.patch('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{


    let {id} = req.params
    let {name,desc,img,price} = req.body
    await Product.findByIdAndUpdate(id,{name,desc,img,price})
    res.redirect('/products')
    }catch(err){
        res.render('error',{err})
    }
})

// to delete a product
router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
    let {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
    }catch(err){
        res.render('error',{err})
    }
})

module.exports = router