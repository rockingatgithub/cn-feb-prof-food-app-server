const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const passport = require('./config/passportJWT')
const PORT = 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(cors())

passport.initialize()

app.use('/', require('./routes'))

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Server successfully running!")
})


