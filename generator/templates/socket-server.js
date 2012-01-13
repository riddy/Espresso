// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso {{e_Version}}
//
// Project: {{appName}}
// ==========================================================================

/*try including this line if you have problems to require socket-io and/or express*/
//require.paths.push('/usr/local/lib/node_modules');

/*include socket-io and express (need to be installed first - try npm)*/
var io = require('socket.io');
var express = require('express');


//create the server
var app = express.createServer()
    , io = io.listen(app);


/*specifys the port to listen for messages*/
app.listen({{port}})
;


/**
 * enable this options for connection-check socket-server
 * --> minimal overhead
 */
//io.configure(function () {
//    //send own heartbeats
//    io.set('heartbeats', false);
//    //high timeout
//    io.set('heartbeat timeout', 2 * 60 * 1000)
//    io.set('close timeout', 3 * 60 * 1000);
//});

/**
 * If a new user connects to the server,
 * inside this method all possible actions are defined
 */
io.sockets.on('connection', function (socket) {

    /**
     * Example function for receiving some messages, channel is "message"
     */
    socket.on('message', function (msg) {

        /*broadcast: send to all users (besides the one who sent the message)*/
        socket.broadcast.emit('message', msg);

        /*answer the user who sent the message*/
        socket.emit('message', 'Your message: ' + msg);

    });


    /* add custom methods */


    /**
     * Disconnection-Method
     */
    socket.on('disconnect', function () {
        /* do sth. on disconnect
         *"socket" contains the information about the disconnected user */
    });


    /**
     * enable this options for connection-check socket-server
     * --> echo the received value to show connection-health
     */
//    socket.on('p', function(val) {
//        socket.emit('p', val);
//    });

});


/**
 * Specify some multicasts:
 */

var chat = io
    .of('/chat');
chat.on('connection', function (socket) {
    socket.emit('message', "back to sender");
    chat.emit('message', "message to everyone in '/chat'");
});

var news = io
    .of('/news');
news.on('connection', function (socket) {
    socket.emit('newmember', "{ news: 'joined' }");
});

