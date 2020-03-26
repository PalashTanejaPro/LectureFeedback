var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var ctr = [0, 0, 0];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //user connected
    io.emit('button set', {value: ctr[1], type: 1}); 
    io.emit('button set', {value: ctr[2], type: 2}); 

    socket.on('button click', function(type) {
        ctr[type] += 1;
        io.emit('button set', {value: ctr[type], type: type});
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
