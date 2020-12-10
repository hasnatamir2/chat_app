"use strict";

var router = require('express').Router();

var _require = require('../handlers/errorHandler'),
    catchErrors = _require.catchErrors;

var userController = require('../controllers/userController');

router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));
module.exports = router;