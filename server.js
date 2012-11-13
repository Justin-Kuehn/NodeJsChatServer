var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(process.env.port);

function handler (req, res) {
  fs.readFile(__dirname + '/chat.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading chat.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { msg: 'You have joined the chat.' });
  
  socket.on('message', function(data){
    socket.broadcast.emit('message', {from: data.from, msg: data.msg});
  });
});
