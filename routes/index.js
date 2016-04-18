var express = require('express');
var io = require('socket.io')(80);
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'socket-test'
	});
});


router.get('/my-namespace', function (req, res, next) {
	res.render('my-namespace', {
		title: 'my-namespace'
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

	socket.on('my other event', function (data) {
		console.log(data);
	});
	
	socket.on('disconnect', function () {
		clearInterval(timeOne);
	});

	//call join to subscribe the socket to a given channel
	//socket.join('some room');
});

//then simply use to or in (they are the same) when broadcasting or emitting
io.to('some room').emit('some event');

var nsp = io.of('/my-namespace');
nsp.on('connection', function (socket) {
	console.log('someone connected');
	nsp.emit('hi', 'everyone!');
});


module.exports = router;