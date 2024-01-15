const Joi = require('joi')
const {productSchema,reviewSchema} = require('./schema') 
const Product= require('./models/Product')


const productValidate = (req,res,next) =>{
    const {name,img,desc,price} = req.body
    const {error} = productSchema.validate({name,img,price,desc})
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        return res.render('error',{msg})
    }
    next()
}

const reviewValidate = (req,res,next) =>{
    const {rating,comment} = req.body
    const {error} = reviewSchema.validate({rating,comment})
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        return res.render('error',{msg})
    }
    next()
}
const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','you are not logged in')
        return res.redirect('/login')
    }
    next()
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','you are not loggedIn')
        return res.redirect('/products')
    }else if(req.user.role!=='seller'){
        req.flash('error','login as a seller please')
        return res.redirect('/products')
    }
   
    next()
}

const isProductAuthor= async(req,res,next)=>{
    let {id} = req.params
    let product = await Product.findById(id)
    if(!product.author.equals(req.user._id)){
        req.flash('error','you are not the owner of the product')
        return res.redirect('/products')
    }
    next()
}

module.exports = {productValidate,reviewValidate,isLoggedIn,isProductAuthor,isSeller}