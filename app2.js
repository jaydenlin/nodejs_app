var express = require('express'),
    app = express(),
	http = require('http'),
	server = http.createServer(app),
    io = require('socket.io').listen(server);

  server.listen(8082);

  app.get('/', function (req, res) {
	  res.sendfile(__dirname + '/remote2.html');
  });
  

  io.sockets.on('connection', function (socket) {
          var room;
	  socket.emit('news', { hello: 'world' });

	  socket.on('remote:selectAnswer',function(data){
                io.sockets.emit('server:receiveAnswer', data);
  	  });

  	  socket.on('device:questionDone',function(data){
		io.sockets.emit('server:prepareAnswers', JSON.parse(data));
		console.log(JSON.parse(data));

  	  });

          socket.on('remote:requestAnswers', function(data){
                io.sockets.emit('server:requestAnswers', {});
		console.log('broadcast server:requestAnswers');
          });


          //socket.emit('server:prepareAnswers', {'preparedAnswers':['abc','def']});

  
    });





