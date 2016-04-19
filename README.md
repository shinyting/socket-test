# socket-test
nodejs socket.io

###概念
实现web实时推送，socket.io是一个开源的WebSocket库，它通过node.js实现WebSocket服务端，同时也提供客户端js库。  
socket.io支持以事件为基础的实时双向通讯，它可以工作在任何平台，浏览器或移动设备。  
socket.io支持4种协议：WebSocket。htmlfile，xhr-polling，jsonp-polling，它会自动根据浏览器选择适合的通讯方式  

###安装socket.io
npm install socket.io  

###实现
成功安装socket.io后，将socket.io.js这个文件引入到html页面，这样就可以在前端使用socket.io与服务器进行通信了  

同时服务器端的对应的文件里(该例是在路由的index.js)跟使用express一样，通过require('socket.io')将其引入到项目中，这样就可以在服务器端使用socket.io了  
使用socket.io,其前后端句法一致，通过socket.emit()来激发一个事件，通过socket.on()来侦听和处理对应事件，这两个事件通过传递的参数进行通信  

在connection事件的回调函数中，  
socket表示的是当前连接到服务器的那个客户端。  
socket.emit()只有自己收的到这个事件，  
socket.broadcast.emit()则表示向除自己外的所有人发送该事件；  
io表示服务器整个socket连接，  
io.sockets.emit()表示所有人都可以收到该事件  
io.emit()表示所有人都可以收到该事件


###实现聊天室功能

###解决跨域问题
cors模块
