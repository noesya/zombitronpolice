
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('motion', (touch) => {
    io.emit('reception', touch);
  });

});

server.listen(3000, () => {
  console.log('listening on *:8080');
});