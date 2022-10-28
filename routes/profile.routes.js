const express = require("express");

const router = express.Router();

const profileController = require('../controllers/profile.controller.js');

router.get('/', profileController.getProfilePage);

router.post('/edit-post', profileController.editPost)
router.post('/edit-profile', profileController.editProfile)
router.post('/delete-post', profileController.deletePost)

module.exports = router;
