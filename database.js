console.log('запустился ' + __filename);
const config = require('./config');
let mongoose = require('mongoose');
mongoose
  .connect(
    config.dbUrlLocal,
    { useNewUrlParser: true }
  )
  .then(
    data => {
      console.log('Подключение к базе данных выполнено!');
    },
    err => {
      console.log('Какая-то ошибка подключения \n' + err);
    }
  );

console.log('исполнился ' + __filename);
