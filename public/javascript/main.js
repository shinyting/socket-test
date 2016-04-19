$(function () {
	var socket = io.connect('http://localhost');
	var flag = 0;
	socket.on('notice', function (data) {
		console.log(data);
		flag ++;
		$('.main').html(data.hello+flag);
	});

	// socket.on('notifyNum', function (data) {
	// 	console.log(data.msg_count);
	// });

	socket.emit('receive', {name: 'data from client'});
})