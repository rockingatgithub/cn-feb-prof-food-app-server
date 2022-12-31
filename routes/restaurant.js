const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('../config/passportJWT')
const Restaurant = require('../models/restaurant')
const router = express.Router()



router.post('/signup', async (req, res) => {

    try{

        console.log(req.body)
        let restaurant = await Restaurant.create(req.body)

        return res.status(200).json({
            data: restaurant,
            userType: 'restaurant',
            message: "Restaurant successfully added!"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            data: [],
            message: "Error Occured!"
        })
    }
    

})

router.post('/signin', async (req, res) => {
    console.log(req.body)
    const restaurant = await Restaurant.findOne({username: req.body.username})
    if(restaurant.password === req.body.password) {

        const token = jwt.sign({
            id: restaurant._id,
            name: restaurant.username
          }, 'my_key', { expiresIn: '5d' });

        return res.status(200).json({
            data: restaurant,
            token: token,
            userType: 'restaurant',
            message: "Restaurant found!"
        })

    }

    return res.status(401).json({
        data: null,
        message: "Restaurant successfully added!"
    })
})

router.get('/listRestaurant', async (req, res) => {

    try{
        const restaurants = await Restaurant.find({})
        return res.status(200).json({
            data: restaurants
        })
    }catch(error){
        return res.status(500).json({
            data: [],
            message: "Error Occured!"
        })
    }

})

module.exports = router