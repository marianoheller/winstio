const lobby = require('../models/lobby');

module.exports = {
  getLobby: (req, res, next) => {
    res.locals.lobby = lobby.getRoom();
    next();
  }
}
