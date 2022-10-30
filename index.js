const express = require('express')
const cors = require('cors')
const PORT = 8000
const app = express()

app.use(cors())

app.get('/test', (req, res) => {
    console.log(req)
    return res.status(200).json({
        data: "API test successfull!"
    })
}  )


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Server successfully running!")
})


