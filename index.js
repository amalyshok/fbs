// ./index.js
let express = require('express');
var bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let cors = require('cors');
require('./static/socket/serverSocket')(http);

app.use('/', function(req, res, next) {
	console.log('Путь: ' + req.url);
	next();
});
 
app.use(express.static(__dirname + '/static'));

http.listen(3000, () => console.log('Http started on port: 3000'));