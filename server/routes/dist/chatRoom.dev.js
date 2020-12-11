"use strict";

var router = require('express').Router();

var _require = require('../handlers/errorHandler'),
    catchErrors = _require.catchErrors;

var chatRoomController = require('../controllers/chatRoomController');

var auth = require('../middleware/auth');

router.get('/', auth, catchErrors(chatRoomController.getAllChatRooms));
router.post('/', auth, catchErrors(chatRoomController.createChatRoom));
module.exports = router;