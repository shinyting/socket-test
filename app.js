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

var userArray = [];
io.on('connection', function (socket) {
	socket.emit('users', {users: userArray});
	socket.on('myMsg', function (data) {
		socket.broadcast.emit('showMsg', data);
	});
	
	socket.on('addUser', function (data) {
		if (userArray.indexOf(data.uname) > -1) {
			socket.emit('nameExisted');
		}
		else {
			socket.userIndex = userArray.length;
			socket.nickname = data.uname;
			userArray.push(data.uname);
			io.emit('showUser', {users: userArray, newone: data.uname});
		}
	});
	socket.on('disconnect', function () {
		if (userArray.length > 0) {
			userArray.splice(socket.userIndex, 1);
			socket.broadcast.emit('removeUser', {rname: socket.nickname, users: userArray});
		}
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