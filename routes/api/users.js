const express = require('express');
const router = express.Router();
const usersController = require("../../controllers/usersController");

// @route GET api/users/test
// @desc Tests the users route
// @acess Public
// @returns a 200 and simple user works messages
router.get('/test', usersController.test);

// @route POST api/users/register
// @desc registers a user
// @acess Public
// @returns 409 conflict the request could not be completed due to a conflict with the current state of the resource
// @returns 201 for a new user sucesfully created
// @returns 500 some db save error
// @returns 400 for invalid input on req.body
router.post('/register', usersController.register);

// @route post api/users/login
// @desc logins a guest
// @acess Public
// @returns 404 when a user is not found
// @returns 400 when a password is incorrect
// @returns 200 when a user is sucessfully logged in with a bearer token
// @returns 500 incase of any errors
router.post('/login', usersController.login);

module.exports = router;