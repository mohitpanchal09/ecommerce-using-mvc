const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path')
const seedDb = require('./seed')
const productRoutes = require('./routes/product')
const methodOverride = require('method-override')
mongoose.connect('mongodb://127.0.0.1:27017/flipkart')
.then(()=>{
    console.log('db connected ...')
})
.catch((err)=>{
    console.log(err)
})
// seedDb(); // run it only once to seed the database

//enabling method override
app.use(methodOverride('_method'))

//set view engine
app.set('view engine','ejs')

//set views ka path
app.set('views',path.join(__dirname,'views'))

//serve static content 
app.use(express.static(path.join(__dirname,'public')))

// to parse req.body data
app.use(express.urlencoded({extended:true})) // to parse body data

//productroutes
app.use(productRoutes)



app.listen(8080,()=>{
    console.log('server connected..')

})