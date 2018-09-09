let socket = io();
let input = document.querySelector('#text');
	socket.emit('Hi', 'Привет, сервер, я html и говорю это через сокет');
	socket.on('Hi', (data) => {console.log(data)});
	socket.on('disconnect', () => console.log('Сервер закончил сессию сокет'));
	
function sendText() {
				let text = document.querySelector('#text').value;
				socket.emit('string', text);
				} 
				
if (input) {
	input.onchange = function () {
	socket.emit('string', input.value);
	input.blur();
	};	
	  input.onfocus = function () {
	  input.value = '';
	  };
}

