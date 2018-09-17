const express = require('express');
const router = express.Router();
const profileController = require("../../controllers/profileController");

//@route GET api/profile/test
//@desc Tests the profile route
//@acess Public
router.get('/test', profileController.test);

module.exports = router;
