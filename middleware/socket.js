const socketModel = require('../models/socket');

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('connection', socketModel.connected);
    socket.on('joinRoom', username => socketModel.joinRoom(socket, username));
    socket.on('leaveRoom', username => socketModel.leaveRoom(socket, username));
  })
}
