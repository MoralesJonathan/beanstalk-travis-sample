const express = require('express');
const router = express.Router();
const speechController = require("../../controllers/speechController");

// @route GET api/speech/test
// @desc Tests the users route
// @acess Public
// @returns a 200 and simple user works messages
router.get('/test', speechController.test);

// @route GET api/speech/list/list/:collection
// @desc Gets a lits of recording
// @acess Public
// @returns a 200 and list of recordings
// @returns a 500 for db error
router.get('/list/:collection', speechController.listSpeeches);

// @route POST api/title
// @desc Updates title of speech
// @acess Public
// @returns a 200 if title was added
// @returns a 500 for db error
router.post('/title', speechController.addTitle);

// @route GET api/speech/:collection/:timestamp
// @desc Processes speech string and returns information on speech
// @acess Public
// @returns a 200 and object of information
// @returns a 500 for db error
router.get('/:collection/:timestamp', speechController.getSpeech);

// @route POST api/speech/
// @desc Inserts speech data
// @acess Public
// @returns a 200 if posted successfully
// @returns a 500 for db error
router.post('/', speechController.saveSpeech);

module.exports = router;
