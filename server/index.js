const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
// We are reading the msg or receiving the msg,
// while receiving the msg 2nd parameter is callback function,
// in that call back we are processing the received msg
io.on("connection", (socket) => {
    socket.on("send_msg", (data) => {
        console.log({ data });
        socket.broadcast.emit("receive_msg", { data })
    })
})

server.listen(3001, () => {
    console.log("Server started and listening");
})