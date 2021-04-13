// Express
const express = require('express')
const app = express()

// Server
const server = require('http').createServer(app)

// WebSocket
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server: server })

// On Client connection
wss.on('connection', function connection(ws) {
    console.log('A new client connected ')

    // On message received
    ws.on('message', function incoming(message) {

        //Broadcast
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    })
})

app.get('/', (req, res) => res.send(''))

server.listen(3000, () => console.log('Listening on port 3000'))