console.log('запустился ' + __filename);
const config = require('../config');
let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    config.dbUrl,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log('Подключение успешно выполнено!');
      require('./usersScheme');
    },
    err => {
      console.log('Какая-то ошибка подключения \n' + err);
    }
  );

console.log('исполнился ' + __filename);
