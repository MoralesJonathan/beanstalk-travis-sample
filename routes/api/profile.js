const express = require('express');
const router = express.Router();

//@route GET api/profile/test
//@desc Tests the profile route
//@acess Public
router.get('/test',(req, res) => { 
    console.log(req);
    res.json('the user endpoint works') 
})

module.exports = router;