const express = require('express');
const router = express.Router()
const Product = require('../models/Product')
const {productValidate} = require('../middleware')

//get all products
router.get('/products',async(req,res)=>{
    try{
    let products=await Product.find()
    res.render('index',{products})
    }catch(err){
        res.render('error',{err})
    }
})


//new product form

router.get('/product/new',(req,res)=>{
    
    res.render('new')
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
    console.log(product)
    res.render('show',{product})
    }catch(err){
        res.render('error',{err})
    }
})

//to show edit form
router.get('/product/:id/edit',async(req,res)=>{
    try{
    let {id} = req.params
    let product = await Product.findById(id)
    res.render('edit',{product})
    }catch(err){
        res.render('error',{err})
    }
})

//to actually edit the form
router.patch('/products/:id',async(req,res)=>{
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
router.delete('/products/:id',async(req,res)=>{
    try{
    let {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
    }catch(err){
        res.render('error',{err})
    }
})

module.exports = router