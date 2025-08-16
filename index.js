import express from "express";
import http from 'http'
import path from "path";
import { Server } from "socket.io";

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Socket io
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        io.emit("message",message)
        console.log("A new user message",message)
    })
})

app.use(express.static(path.resolve("./public")))

app.get('/', (_,res) => {
    return res.sendFile("/public/index.html")
})

server.listen(9000,() => { console.log(`server started at http://localhost:9000`)})