console.log('запустился ' + __filename);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
require('./static/socket/serverSocket')(http);
const mongoose = require('./database.js');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let user = { login: 'Аноним' };
//обработка логина и регистрации
app.use('/login', function(req, res, next) {
  res.render('login', { body: req.body });
  next();
});
app.use('/signup', function(req, res, next) {
  user = req.body;
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
