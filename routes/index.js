var express = require('express');
var io = require('socket.io')(80);
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'socket-test'
	});
});

io.on('connection', function (socket) {
	var params = {
		'hello': 'hello from server',
		'world': 'world from server'
	};
	var timeOne = setInterval(function () {
		socket.emit('news', params);
	}, 3000);
	// socket.on('my other event', function (data) {
	// 	console.log(data);
	// });
});

module.exports = router;