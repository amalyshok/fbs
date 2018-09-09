           	socket.emit('Hi', 'Привет, сервер, я клон сайта');
			socket.on('Hi', (data) => {console.log(data)});
			socket.on('disconnect', () => console.log('Сервер закрыл соединение'));
			function sendText() {
				let text = document.querySelector('#text').value;
				socket.emit('string', text);
				} 

if (document.querySelector('#text')) {
	sendText();
input.onchange = function () {
	
	input.blur();
	};	
	
input.onfocus = function () {
	input.value = '';
	};
}


	 