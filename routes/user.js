const express = require("express");
const router = express.Router();
const {Post} = require('../models/user');
const {authenticate} = require('../middleware/authenticate');

// @route POST /user
// @desc add new user
router.post("/", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// @route GET /user/me
// @desc Load the user
router.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);       
});

//  {email, password}
// @route POST /user/login
// @desc Loads all
router.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch( (e) => {
        res.status(400).send();
    });
})

// @route GET /postroute
// @desc Loads all
router.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });  
});

module.exports = router;