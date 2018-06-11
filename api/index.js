const { version } = require('../package.json');
const { Router } = require('express');
const lobby = require('./lobby');
//const facets = require('./facets');


module.exports = ({ config, db }) => {
	let api = Router();

	// mount the facets resource
  // api.use('/facets', facets({ config, db }));
	api.use('/lobby', lobby({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}