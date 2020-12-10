"use strict";

var ChatRoom = require('../models/ChatRoom');

exports.createChatRoom = function _callee(req, res) {
  var name, nameRegex, chatRoomExsists, chatRoom;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name;
          nameRegex = /^[A-Za-z]+$/;

          if (nameRegex.test(name)) {
            _context.next = 4;
            break;
          }

          throw "Chatroom name must be Alphabets only";

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(ChatRoom.findOne({
            name: name
          }));

        case 6:
          chatRoomExsists = _context.sent;

          if (!chatRoomExsists) {
            _context.next = 9;
            break;
          }

          throw "Chatroom already exsist";

        case 9:
          chatRoom = new ChatRoom({
            name: name
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(chatRoom.save());

        case 12:
          res.json({
            message: 'Chat Room Created!'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};