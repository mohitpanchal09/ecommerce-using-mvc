const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    gender:{
        type:String,required:true,trim:true
    },
    email:{
        type:String,required:true,trim:true
    },
    role:{
        type:String,
        default:'buyer'
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        
        }
    ]
})
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User',userSchema)
module.exports = User