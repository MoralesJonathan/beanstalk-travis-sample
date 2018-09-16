const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ acess: 'denied no token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            console.log(err);
            res.status(401).json(err).end();
        }
        const userId = decoded.id;
        console.log(userId);
        User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                res.status(401).end();
            }
            // pass user details onto next route
            req.user = user
            return next();
        });
    });
};