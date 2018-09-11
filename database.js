console.log('запустился ' + __filename);
const config = require('./config');
let mongoose = require('mongoose');
mongoose
  .connect(
    config.dbUrl,
    { useNewUrlParser: true }
  )
  .then(data => {}, err => console.log('Какая-то ошибка подключения \n' + err));

console.log('исполнился ' + __filename);
