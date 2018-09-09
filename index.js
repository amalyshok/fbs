// ./index.js
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
require('./static/socket/serverSocket')(http);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//тестовый обработчик json post запроса (работает ыыыы =)
app.use('/test', function(req, res, next) {
	console.log(req.body);
	next();
});

// рендерим шаблон основной страницы сайта, с обращением по имени. 
app.use('/template', function (req, res, next) {
	res.render( 'index', {name: 'Александр'} );
	next();
});

app.use(express.static(__dirname + '/static'));

http.listen(3000, () => console.log('Http started on port: 3000'));