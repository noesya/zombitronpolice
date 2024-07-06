const bars = 8;
const socket = io();
try {
    document.requestFullscreen();
} catch (e) {}

let sequencer = new Nexus.Sequencer('#sequencer', {
  'size': [600, 300],
  'mode': 'toggle',
  'rows': 4,
  'columns': bars,
  'paddingRow': 10,
  'paddingColumn': 10
});

sequencer.matrix.set.all([
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
])

sequencer.on('change', (data) => {
  // data est de la forme {row: 2, column: 0, state: true}
  socket.emit('sequencer', data)
})