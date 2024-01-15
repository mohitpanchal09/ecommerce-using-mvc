const Joi = require('joi')

const productSchema = Joi.object({

    name:Joi.string().required().trim(),
    img:Joi.string().required().trim(),
    price:Joi.number().required().min(0),
    desc:Joi.string().required().trim()
})

const reviewSchema = Joi.object({
    comment:Joi.string().required().trim(),
    rating:Joi.number().required().min(0).max(5)
})

module.exports = {productSchema,reviewSchema}