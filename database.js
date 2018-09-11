const config = require('./config');
let mongoose = require('mongoose');
mongoose
  .connect(
    config.dbUrl,
    { useNewUrlParser: true }
  )
  .then(
    data => console.log(data),
    err => console.log('Какая-то ошибка подключения \n' + err)
  );