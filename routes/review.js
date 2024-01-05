const Product = require('../models/Product')
const Review = require('../models/Review')
const express = require('express')
const router = express.Router()


// create a review
router.post('/products/:id/review',async(req,res)=>{
    const {id} = req.params
    const {rating,comment}= req.body
    const product = await Product.findById(id)
    const review = new Review({rating,comment})
    product.reviews.push(review)
    await product.save()
    await review.save()
    res.redirect(`/product/${id}`)
})

module.exports = router;