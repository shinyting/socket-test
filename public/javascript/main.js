$(function () {
	var nickname;
	var socket = io.connect('http://127.0.0.1');
	
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

	//显示该聊天室中当前用户数
	socket.on('users', function (data) {
		$('.ucount').html(data.users.length);
	});

	//显示服务端返回的其他客户端发送的消息
	socket.on('showMsg', function (data) {
		var string = "<div class='clearfix'><p class='pull-left'><span class='blue'>" + data.user + ": </span>" + data.msg + "</p></div>";
		$('.chatbox').append(string);
	});

	//显示用户信息：当前在线人数，及新加入用户
	socket.on('showUser', function (data) {
		console.log(data.users);
		$('.ucount').html(data.users.length);
		var ustring = "<p class='text-center gray'>" + data.newone + "加入聊天</p>";
		$('.chatbox').append(ustring);
	});

	//用户名存在时的处理方法
	socket.on('nameExisted', function () {
		$('.rtip').removeClass('none');
		$('.mask').removeClass('none');
	});

	//显示用户离开的信息
	socket.on('removeUser', function (data) {
		console.log(data);
		var rustring = "<p class='text-center gray'>" + data.rname + "离开</p>";
		$('.chatbox').append(rustring);
		$('.ucount').html(data.users.length);
	});

	//发送信息的方法
	function sendMsg () {
		var mstring;
		var msg = $('.mymsg').val();
		mstring = "<div class='clearfix'><p class='pull-right'><span class='purple'>" + nickname + ":</span> " + msg + "</p></div>";
		$('.chatbox').append(mstring);
		console.log(msg);
		$('.mymsg').val('');
		socket.emit('myMsg', {msg: msg, user: nickname})
	}

	//保存用户名的方法
	function saveUser () {
		nickname = $('.nickname').val();
		if (!nickname) {
			return;
		}
		socket.emit('addUser', {uname: nickname});
		$('.mask').addClass('none');
	}
})