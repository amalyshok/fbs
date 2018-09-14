socket.emit('Hi', 'Привет, сервер, я сайт');
socket.on('Hi', data => {
  console.log(data);
});
socket.on('disconnect', () => console.log('Сервер закрыл соединение'));

function sendText(text) {
  socket.emit('string', text);
}
