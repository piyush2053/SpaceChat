const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get('/',(req,res)=>{
    // res.send('hello')
    res.sendFile('index.html' , { root : __dirname});
})

app.use(express.static(__dirname + '/public'))

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})