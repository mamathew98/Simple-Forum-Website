const express = require("express");

const router = express.Router();

const indexController = require('../controllers/index.controller.js');

router.get('/', indexController.getaAuthPage);

router.post('/signup', indexController.signup)
router.post('/signin', indexController.signin)


module.exports = router;
