console.log('запустился ' + __filename);
module.exports = function(http) {
  let io = require('socket.io')(http);
  io.on('connection', socket => {
    socket.emit('Hi', 'привет, гугл хром, я сервер и говорю это через сокет');
    socket.on('Hi', data => {
      console.log(data);
    });
    socket.on('disconnect', () =>
      console.log('клиент закончил сессию сокет \n')
    );
    socket.on('string', text => {
      if (typeof text === 'object') {
        text = JSON.stringify(text);
      }
      console.log('С сайта отправлен текст: "' + text + '"');
      socket.emit('Hi', `Сервер получил текст :"${text}"`);
    });
  });
};

console.log('исполнился ' + __filename);
