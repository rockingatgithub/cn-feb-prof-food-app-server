const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const PORT = 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(cors())

app.use('/', require('./routes'))

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Server successfully running!")
})


