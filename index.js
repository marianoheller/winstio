const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const initializeDb = require('./db');
const middleware = require('./middleware/main');
const api = require('./api');
const config = require('./config.json');


// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
  app.use('/api', api({ config, db }));
  
  io.on('connection', function(client) {  
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log(data);
    });
  });

	server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${server.address().port}`);
	});
});

module.exports = app;