const mongoose = require('mongoose')


const restaurantSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    food: [

        {
            type: mongoose.Types.ObjectId,
            ref: 'Food',
        }

    ]

})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant