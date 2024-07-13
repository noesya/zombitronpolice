const Zombitron = require("./Zombitron")
const zombitronpolis = new Zombitron(https = true);

zombitronpolis.app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/zombitronpolis.html');
});

zombitronpolis.app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/views/potentiometers_5.html');

});

zombitronpolis.socketServer.on('connection', (socket) => {
  socket.on('dial1', (v) => {
    zombitronpolis.socketServer.emit('dial1', v);
  });

  socket.on('dial2', (v) => {
    zombitronpolis.socketServer.emit('dial2', v);
  });

  socket.on('dial3', (v) => {
    zombitronpolis.socketServer.emit('dial3', v);
  });

  socket.on('dial4', (v) => {
    zombitronpolis.socketServer.emit('dial4', v);
  });

  socket.on('dial5', (v) => {
    zombitronpolis.socketServer.emit('dial5', v);
  });

  socket.on('dial-motion', (data) => {
    zombitronpolis.socketServer.emit('dial-motion', data);
  });
});

zombitronpolis.start();