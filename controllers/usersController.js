const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

// Require the user
const User = require('../models/User');

// Load Input Validators for Registration
const validateRegisterInput = require('../helpers/validators/register');
const validateLoginInput = require('../helpers/validators/login');

module.exports = {
    test: (req, res) => {
      res.status(200).json('the user endpoint works') 
    },
    register:(req, res) => {
        // Check validation on request body
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        // deconstruct values from body
        const { email, name, password } = req.body
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.email = 'email already registered'
                    return res.status(409).json(errors);
                } else {
                    const avatar = gravatar.url(email, {
                        s: '200', //size
                        r: 'pg', //rating
                        d: 'mm' //default
                    });
                    const newUser = new User({
                        name,
                        email,
                        avatar,
                        password
                    });
                    newUser.save()
                        .then(user => res.status(201).json(user))
                        .catch(err => {
                            console.error(error)
                            errors.db = 'an error has occured in saving in the db'
                            res.status('500').json(errors)
                        });
                }
            });
    },
    login: (req, res) => {
        // Check validation on request body
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                //check for user
                if (!user) {
                    errors.user= 'User not found';
                    return res.status(404).json(errors);
                }
                user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = { id: user.id, name: user.name, avatar: user.avatar } // created JWT payload
                            jwt.sign(
                                payload,
                                process.env.SECRETORPRIVATEKEY,
                                { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) },
                                (err, token) => {
                                    res.json({
                                        sucess: true,
                                        token: 'Bearer ' + token
                                    });
                                });
                        } else {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors)
                        }
                    })
                    .catch(err => {
                        console.error(error)
                        res.status('500').json({ login: 'an error has occured in the login process' })
                    });
    
            });
    }
}