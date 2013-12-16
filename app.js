var express = require('express'),
    app = express(),
	http = require('http'),
	server = http.createServer(app),
    io = require('socket.io').listen(server);

  server.listen(8080);

  app.get('/', function (req, res) {
	  res.sendfile(__dirname + '/remote.html');
  });

  io.sockets.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
	  socket.on('my other event', function (data) {
		      console.log(data);
			    });

	  socket.on('remote:selectAnswer',function(data){
	        socket.broadcast.emit('server:receiveAnswer', data);

  	  });

  	  socket.on('device:questionDone',function(data){
		socket.broadcast.emit('server:prepareAnswers', JSON.parse(data));
	        console.log(JSON.parse(data));

  	  });

          //socket.emit('server:prepareAnswers', {'preparedAnswers':['abc','def']});

  });


