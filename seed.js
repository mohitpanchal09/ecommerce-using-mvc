const Product = require('./models/Product')
const mongoose = require('mongoose');
const products=[
    {
        name:'product1',
        img:"https://images.unsplash.com/photo-1682686581362-796145f0e123?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        price:500,
        desc:'good one'
    }
    ,
    {
        name:'product2',
        img:"https://plus.unsplash.com/premium_photo-1678371209809-a9ba1d32d044?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
        price:5000,
        desc:'bekar one'
    }
    ,{name:'product3',
    img:"https://images.unsplash.com/photo-1704196381662-2eab63f28162?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
    price:200,
    desc:'best one'

    }
]

async function seedDb(){
    await Product.insertMany(products)
    console.log('product inserted')
}

module.exports = seedDb