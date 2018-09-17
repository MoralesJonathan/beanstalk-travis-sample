const express = require('express');
const router = express.Router();
const postController = require("../../controllers/postController");

//@route GET api/posts/test
//@desc Tests the posts route
//@acess Public
router.get('/test', postController.test)

module.exports = router;