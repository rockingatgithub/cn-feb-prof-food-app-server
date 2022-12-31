const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sudhendrasingh:luD6Uwmar6V1f2By@cluster0.rhtev.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection

db.once('open', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Database connected!")
})

module.exports = db