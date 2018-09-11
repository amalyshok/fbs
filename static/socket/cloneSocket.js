console.log('запустился ' + __filename);
socket.emit('Hi', 'Привет, сервер, я клон сайта');
socket.on('Hi', data => {
  console.log(data);
});
socket.on('disconnect', () => console.log('Сервер закрыл соединение'));

function sendText(text) {
  socket.emit('string', text);
}

console.log('исполнился ' + __filename);
