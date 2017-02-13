'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lola');
mongoose.connection.on('connected', function(){
	console.log('mongoose default connection open')
})
mongoose.connection.on('error', function(err){
	console.log('mongoose error:', err);
})

app.use(express.static('./dist'));

require('./server/middleware')(app);
require('./server/auth')(app);
require('./server/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
