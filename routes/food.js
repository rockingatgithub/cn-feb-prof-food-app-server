const express = require('express')
const passport = require('../config/passportJWT')
const Food = require('../models/food')
const Restaurant = require('../models/restaurant')
const router = express.Router()


router.post('/addFood', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }) ,async (req, res) => {

    try{

        console.log(req.body, req.user, req.user._id)

        const food = await Food.create(req.body)
        const rest = await Restaurant.findById(req.user._id) 
        rest.food.push(food._id)
        await rest.save()

        return res.status(200).json({
            data: food
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            data: "Error occured!"
        })
    }    

})


module.exports = router