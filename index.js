// ./index.js
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
require('./static/socket/serverSocket')(http);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let user = { login : 'Аноним'};
//обработка логина и регистрации
app.use('/login', function(req, res, next) {
	res.render('login', {body: req.body});
	next();
});
app.use('/signup', function(req, res, next) {
	user = req.body;
	res.redirect('/template');
	next();
});

// рендерим шаблон основной страницы сайта, с обращением по имени. 
app.use('/template', function (req, res, next) {
	res.render( 'index', {login: user.login} );
	next();
});

app.use(express.static(__dirname + '/static'));

http.listen(3000, () => console.log('Http started on port: 3000'));