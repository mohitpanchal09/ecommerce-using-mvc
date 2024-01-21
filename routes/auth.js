const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const router = express.Router()

//get the register page
router.get('/register',(req,res)=>{
    res.render('auth/register')
})
//actually create the user
router.post('/register',async(req,res)=>{
    let {username,email,gender,role,password} = req.body
    let user = new User({username,email,gender,role})
    const newUser = await User.register(user,password)
    // res.send(newUser)
    res.redirect('/login')
})



// get the login page
router.get('/login',(req,res)=>{
    res.render('auth/login')
})


router.post('/login',
passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    req.flash('success',` welcome back ${req.user.username}`)
    res.redirect('/products');
  }

)
//logout route
router.get('/logout' , (req,res)=>{
    req.logout(()=>{
        res.redirect('/login');
    });
})

module.exports= router