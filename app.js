const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path')
const seedDb = require('./seed')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const flash = require('connect-flash');
const session=require('express-session')
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local'); //pass

const User = require('./models/User');
mongoose.connect('mongodb://127.0.0.1:27017/flipkart')
.then(()=>{
    console.log('db connected ...')
})
.catch((err)=>{
    console.log(err)
})

let config={
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true }
    }



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


// ---------passport---------
app.use(session(config))
app.use(flash());

// use static serialize and deserialize of model for passport session support
app.use(passport.initialize()); //pass
app.use(passport.session()); //pass
passport.serializeUser(User.serializeUser()); //pass
passport.deserializeUser(User.deserializeUser()); //pass

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate())); //pass

// --------------

app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

// ---------



app.use(productRoutes)
app.use(reviewRoutes)
app.use(userRoutes)
app.use(wishlistRoutes)
app.use(cartRoutes)

app.listen(8080,()=>{
    console.log('server connected..')

})