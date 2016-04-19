$(function () {
	var nickname;
	var socket = io.connect('http://127.0.0.1');
	// var flag = 0;
	// socket.on('notice', function (data) {
	// 	console.log(data);
	// 	flag ++;
	// 	$('.main').html(data.hello+flag);
	// });

	// socket.emit('receive', {name: 'data from client'});

	//加入聊天室
	$('.setname').on('click', saveUser);
	$('.nickname').on('keydown', function (event) {
		if (event.which === 13) {
			saveUser();
		}
	})

	//发送消息
	$('.sendbtn').on('click', sendMsg);
	$('.mymsg').on('keydown', function (event) {
		if (event.which === 13) {
			sendMsg();
		}
	});


	socket.on('showMsg', function (data) {
		var string = "<div class='clearfix'><p class='pull-left'><span class='blue'>" + data.user + ": </span>" + data.msg + "</p></div>";
		$('.chatbox').append(string);
	});

	socket.on('showUser', function (data) {
		console.log(data.users);
		$('.ucount').html(data.users.length);
		var ustring = "<p class='text-center gray'>" + data.newone + "加入聊天</p>";
		$('.chatbox').append(ustring);
	});

	socket.on('nameExisted', function () {
		$('.mask').removeClass('none');
	});

	socket.on('removeUser', function (data) {
		console.log(data);
		var rustring = "<p class='text-center gray'>" + data.rname + "离开</p>";
		$('.chatbox').append(rustring);
		$('.ucount').html(data.users.length);
	});

	function sendMsg () {
		var mstring;
		var msg = $('.mymsg').val();
		mstring = "<div class='clearfix'><p class='pull-right'><span class='purple'>" + nickname + ":</span> " + msg + "</p></div>";
		$('.chatbox').append(mstring);
		console.log(msg);
		$('.mymsg').val('');
		socket.emit('myMsg', {msg: msg, user: nickname})
	}

	function saveUser () {
		nickname = $('.nickname').val();
		if (!nickname) {
			return;
		}
		socket.emit('addUser', {uname: nickname});
		$('.mask').addClass('none');
	}
})