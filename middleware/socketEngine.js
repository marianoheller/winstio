const engine = require('../models/engine');

module.exports = (io) => {
  io.on('connection', engine.connected)
  io.on('joinRoom', engine.joinRoom)
  io.on('leaveRoom', engine.leaveRoom)
  return io;
}
