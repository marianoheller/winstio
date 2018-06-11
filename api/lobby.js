const { Router } = require('express');


module.exports = ({ config, db }) => {
  let lobby = Router();
  
	lobby.get('/', (req, res) => {
		res.json({ lobby: res.locals.lobby });
	});

	return lobby;
}
