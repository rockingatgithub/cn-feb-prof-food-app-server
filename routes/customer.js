const express = require('express')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const passport = require('../config/passportJWT')
const router = express.Router()



router.post('/signup', async (req, res) => {

    console.log(req.body)
    let customer = await Customer.create(req.body)

    return res.status(200).json({
        data: customer,
        userType: 'customer',
        message: "Customer successfully added!"
    })

})

router.post('/signin', async (req, res) => {
    console.log(req.body)
    const customer = await Customer.findOne({username: req.body.username})
    if(customer.password === req.body.password) {

        const token = jwt.sign({
            id: customer._id,
            name: customer.username
          }, 'my_key', { expiresIn: '5d' });

        return res.status(200).json({
            data: customer,
            token: token,
            userType: 'customer',
            message: "customer found!"
        })

    }

    return res.status(401).json({
        data: null,
        message: "customer successfully added!"
    })
})

router.get('/profile', passport.authenticate('JWT', { failureRedirect: '/signin', session: false })  , (req, res) => {

    console.log("the user", req.user)

})


module.exports = router