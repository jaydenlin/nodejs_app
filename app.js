var express = require('express'),
    app = express(),
	http = require('http'),
	server = http.createServer(app),
    io = require('socket.io').listen(server);

  server.listen(8080);

  app.get('/', function (req, res) {
	  res.sendfile(__dirname + '/remote.html');
  });
  
  app.get('/test', function (req, res) {
          res.sendfile(__dirname + '/test.html');
  });

  io.sockets.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });

	  socket.on('remote:selectAnswer',function(data){
	        //socket.broadcast.emit('server:receiveAnswer', data);
                io.sockets.emit('server:receiveAnswer', data);
  	  });

  	  socket.on('device:questionDone',function(data){
		//socket.broadcast.emit('server:prepareAnswers', JSON.parse(data));
		io.sockets.emit('server:prepareAnswers', JSON.parse(data));
		console.log(JSON.parse(data));

  	  });

          socket.on('remote:requestAnswers', function(data){
                //socket.broadcast.emit('server:requestAnswers', {});
                io.sockets.emit('server:requestAnswers', {});
		//debug
		//socket.emit('server:requestAnswers', {});
		console.log('broadcast server:requestAnswers');
          });

          //socket.emit('server:prepareAnswers', {'preparedAnswers':['abc','def']});

  });


