const { Router } = require('express');
const lobbyMw = require('../middleware/lobby');


module.exports = ({ config, db }) => {
  let lobby = Router();
  
	lobby.get('/', lobbyMw.getLobby, (req, res) => {
		res.json({ lobby: res.locals.lobby });
	});

	return lobby;
}
