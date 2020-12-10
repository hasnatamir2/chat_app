"use strict";

// const mongoose = require('mongoose')
var User = require('../models/User');

var sh256 = require('js-sha256');

var jwt = require('jsonwebtoken');

exports.register = function _callee(req, res) {
  var _req$body, name, email, password, emailRegex, userCheck, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (emailRegex.test(email)) {
            _context.next = 4;
            break;
          }

          throw "incorrect email format";

        case 4:
          if (!(password.length < 6)) {
            _context.next = 6;
            break;
          }

          throw "Password must be 6 characters or more";

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          userCheck = _context.sent;

          if (!userCheck) {
            _context.next = 11;
            break;
          }

          throw "User already registered";

        case 11:
          user = new User({
            name: name,
            email: email,
            password: sh256(password + process.env.SALT)
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.json({
            message: "User ".concat(name, " registered sucessfully!")
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.login = function _callee2(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email,
            password: sh256(password + process.env.SALT)
          }));

        case 3:
          user = _context2.sent;
          console.log(user);

          if (user) {
            _context2.next = 7;
            break;
          }

          throw "Email or password incorrect";

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(jwt.sign({
            id: user.id
          }, process.env.SALT));

        case 9:
          token = _context2.sent;
          console.log(token);
          res.json({
            message: 'User has logged in successfully',
            token: token
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};