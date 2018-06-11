const { createHash } = require('../lib/utils');


const usernames = {};
const rooms = [];

const createRoom = () => ({
  id: createHash(),
  qtyPlayers: 0,
});

module.exports = {
  connected: () => {
    console.log('Client connected...');
  },

  joinRoom: (socket, username) => {
    usernames[username] = username;
    let room = rooms.find( r => r.qtyPlayers < 4 );
    if (!room) {
      room = createRoom();
      rooms.push(room);
    }

    room.qtyPlayers++;
    socket.username = username;
    socket.room = room.id;

    socket.join(room.id);
    socket.emit('updategame', 'SERVER', `'you have connected to ${room.id}`);
    socket.broadcast.to(room.id).emit('updategame', 'SERVER', `${username} has connected to this room`);
    socket.emit('updaterooms', rooms, room.id);
    return socket;
  },

  leaveRoom: (socket) => {
    delete usernames[socket.username];
    // Remove player from player count in room
    const roomIndex = rooms.findIndex( r => r.id === socket.id );
    if(roomIndex !== -1) {
      rooms[roomIndex].qtyPlayers--;
      // Delete room if no players are in
      if(rooms[roomIndex].qtyPlayers < 1) {
        rooms.splice(roomIndex, 1);
      }
    }

    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updategame', 'SERVER', `${socket.username}  has disconnected`);
    socket.leave(socket.room);
    return socket;
  }
};
