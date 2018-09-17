const express = require('express');
const router = express.Router();
const posts = require('./posts');
const profile = require('./profile');
const users = require ('./users');
const speech = require('./speech');
const authCheck = require('../../middleware/authCheck');

router.use('/users', users);
router.use('/', authCheck);
router.use('/profile', profile);
router.use('/posts', posts);
router.use('/speech', speech);

module.exports = router;