console.log('запустился ' + __filename);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const addUser = require('./db/usersScheme').addUser;
const checkUser = require('./db/usersScheme').checkUser;
require('./static/socket/serverSocket')(http);

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let user = { login: 'Аноним' };
//обработка логина и регистрации
app.use('/login', function(req, res) {
  checkUser(req.body.email, req.body.password, req, res);
});

app.use('/signup', function(req, res, next) {
  user = req.body;
  addUser(user.login, user.email, user.password);
  res.redirect('/template');
  next();
});

// рендерим шаблон основной страницы сайта, с обращением по имени.
app.use('/template', function(req, res, next) {
  res.render('index', { login: user.login });
  next();
});

app.use(express.static(__dirname + '/static'));

module.exports = http;

console.log('исполнился ' + __filename);
