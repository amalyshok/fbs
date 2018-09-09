           	socket.emit('Hi', 'Привет, сервер, я клон сайта');
			socket.on('Hi', (data) => {console.log(data)});
			socket.on('disconnect', () => console.log('Сервер закрыл соединение'));