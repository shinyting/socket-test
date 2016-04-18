$(function () {
	var socket = io.connect('http://localhost');
	var flag = 0;
	socket.on('news', function (data) {
		console.log(data);
		flag ++;
		$('.main').html(data.hello+flag);
	});

	socket.emit('my other event', {name: 'data from client'});

	var socket1 = io.connect('http://localhost/my-namespace');
	socket1.on('hi', function (data) {
		console.log(data);
	});
})