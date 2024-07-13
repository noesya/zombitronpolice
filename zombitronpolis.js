const { networkInterfaces, hostname } = require('os');

const port = 3000;

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')
};

const express = require('express');
var app = express();

const server = https.createServer(options, app);

const { Server } = require("socket.io");
const io = new Server(server);

const nets = networkInterfaces();
const hostnames = ["localhost", "*"];
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      hostnames.push(net.address);
    }
  }
}

// const WebSocket = require('ws'); // tester le ws natif pour les vieux tels... 
// const socket = new WebSocket.Server({port: 3300});
// socket.on('connection', (ws) => {
//   console.log("new connection")
// });

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/zombitronpolis.html');
});

app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/views/potentiometers_5.html');
});

io.on('connection', (socket) => {
  socket.on('dial1', (v) => {
    io.emit('dial1', v);
  });

  socket.on('dial2', (v) => {
    io.emit('dial2', v);
  });

  socket.on('dial3', (v) => {
    io.emit('dial3', v);
  });

  socket.on('dial4', (v) => {
    io.emit('dial4', v);
  });

  socket.on('dial5', (v) => {
    io.emit('dial5', v);
  });

  socket.on('dial-motion', (data) => {
    io.emit('dial-motion', data);
  });
});

server.listen(port, () => {
  console.log(`listening on:`);
  hostnames.forEach(hostname => {
    console.log(`- https://${hostname}:${port}`);
  })
});