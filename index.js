const express = require('express')
const app = express()
const http = require('http').createServer(app)
const PORT = 3000

var count = 0;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT}`)
})


app.get('/', (req, res) => {
    // res.send('hello')
    res.sendFile('index.html', { root: __dirname });
})

app.use(express.static(__dirname + '/public'))

// Socket 
const io = require('socket.io')(http)  //Padding server -(http) to connect the Socket with Server

io.on('connection', (socket) => {
    count++;
    console.log(count, "People in a room")
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})