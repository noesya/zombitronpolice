
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/shader', function (req, res) {
  res.sendFile(__dirname + '/shader.html');
});


app.get('/sound', function (req, res) {
  res.sendFile(__dirname + '/sound.html');
});

io.on('connection', (socket) => {
  socket.on('motion', (touch) => {
    console.log(touch.ratio.x)
    io.emit('reception', touch);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});