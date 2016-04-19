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
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', routes);
app.use('/about', about);

var userArray = [];
io.on('connection', function (socket) {
	// var params = {
	// 	hello: 'hello from server',
	// 	world: 'world from server'
	// };
	// var timeOne = setInterval(function () {
	// 	socket.emit('notice', params);
	// }, 3000);
	// socket.on('receive', function (data) {
	// 	console.log(data);
	// });

	socket.on('myMsg', function (data) {
		console.log(data);
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
			console.log(userArray);
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