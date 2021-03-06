let {User} = require('./../models/user');

let authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {                
        if(!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send("some error occured during login");
    });
};

module.exports = {authenticate};