const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/delivery_app')

const db = mongoose.connection

db.once('open', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Database connected!")
})

module.exports = db