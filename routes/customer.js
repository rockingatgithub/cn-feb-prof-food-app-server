const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()



router.post('/signup', async (req, res) => {

    console.log(req.body)
    let customer = await Customer.create(req.body)

    return res.status(200).json({
        data: customer,
        message: "Customer successfully added!"
    })

})


module.exports = router