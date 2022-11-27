const express = require('express')
const router = express.Router()



router.use('/cust', require('./customer'))
router.use('/rest', require('./restaurant'))
router.use('/food', require('./food'))




module.exports = router