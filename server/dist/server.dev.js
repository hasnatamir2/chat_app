"use strict";

var mongoose = require('mongoose');

var app = require('./app');

require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on('error', function (err) {
  console.log('mongoose connection error', err.message);
});
mongoose.connection.once('open', function () {
  console.log('mongoDB connected');
});

require('./models/ChatMessage');

require('./models/ChatRoom');

require('./models/User');

var port = process.env.PORT || 8081;
var server = app.listen(port, function () {
  console.log("server up and running on port ".concat(port));
});

var io = require("socket.io")(server);

var jwt = require('jsonwebtoken');

var Message = require('./models/ChatMessage');

var User = require('./models/User');

io.use(function _callee(socket, next) {
  var token, payload;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            console.log(token);
            token = socket.handshake.query.token;
            payload = jwt.verify(token, process.env.SALT);
            socket.userId = payload.id;
            next();
          } catch (err) {
            console.err(err);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
io.on('connection', function (socket) {
  console.log("connected" + socket); // console.log(socker)

  socket.on("disconnect", function () {
    console.log("disconnected" + socket.userId);
  });
  socket.on('joinRoom', function (_ref) {
    var chatroomId = _ref.chatroomId;
    socket.join(chatroomId);
  });
  socket.on('leaveRoom', function (_ref2) {
    var chatroomId = _ref2.chatroomId;
    socket.leave(chatroomId);
  });
  socket.on('chatroomMessage', function _callee2(_ref3) {
    var chatroomId, message, user, _message;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chatroomId = _ref3.chatroomId, message = _ref3.message;

            if (!(message.trim().length > 0)) {
              _context2.next = 10;
              break;
            }

            console.log(socket);
            _context2.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              id: socket.userId
            }));

          case 5:
            user = _context2.sent;
            _message = new Message({
              chatroom: chatroomId,
              user: socket.userId,
              message: _message
            });
            io.on(chatroomId).emit('newMessage', {
              message: _message,
              name: user.name,
              userId: socket.userId
            });
            _context2.next = 10;
            return regeneratorRuntime.awrap(_message.save());

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});