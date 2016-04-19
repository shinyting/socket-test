var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io')(80);

var routes = require('./routes/index');
var about = require('./routes/about');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/about', about);

io.on('connection', function (socket) {
	var params = {
		hello: 'hello from server',
		world: 'world from server'
	};
	var timeOne = setInterval(function () {
		socket.emit('notice', params);
	}, 3000);
	socket.on('receive', function (data) {
		console.log(data);
	});
	// socket.on('notifyNum', function (data) {
	// 	console.log(data);
	// });
	socket.on('disconnect', function () {
		clearInterval(timeOne);
	});
});

app.use(function (req, res, next) {
	var err = new Error('not found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;