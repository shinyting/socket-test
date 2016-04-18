$(function () {
	var socket = io.connect('http://localhost');
	var flag = 0;
	socket.on('news', function (data) {
		console.log(data);
		flag ++;
		// socket.emit('my other event', {name: 'data from client'});
		$('.main').html(data.hello+flag);
	})
})