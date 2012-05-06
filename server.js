var configuration = require('./config.js');
var express = require('express');

var app = express.createServer();
app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
});
app.listen(3000);
var io = require('socket.io').listen(app);
io.set('log level', 1);
io.enable('browser client etag');
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function() {
    });
});
