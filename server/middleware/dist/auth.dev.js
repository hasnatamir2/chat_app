"use strict";

var jwt = require('jsonwebtoken');

module.exports = function _callee(req, res, next) {
  var token, payload;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.headers.authorization) {
            _context.next = 3;
            break;
          }

          throw "Forbidden!!";

        case 3:
          token = req.headers.authorization.split(" ")[1];
          _context.next = 6;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.SALT));

        case 6:
          payload = _context.sent;
          req.payload = payload;
          next();
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.err(_context.t0);
          res.status(401).json({
            message: "Forbidden!!!!"
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};