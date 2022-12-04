const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const passport = require('./config/passportJWT')
const PORT = 8000
const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: {origin: "*"} });


app.use(express.json())
app.use(express.urlencoded())

app.use(cors())

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('hello-server', (msg) => {
        console.log(msg)
    })

    socket.emit('hello', 'hello client')
  });

passport.initialize()

app.use('/', require('./routes'))

server.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("Server successfully running!")
})


