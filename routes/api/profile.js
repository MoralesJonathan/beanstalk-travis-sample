const express = require('express');
const router = express.Router();

//@route GET api/profile/test
//@desc Tests the profile route
//@acess Public
router.get('/test',(req, res) => { 
    res.status(200).json('the user endpoint works') 
})

module.exports = router;