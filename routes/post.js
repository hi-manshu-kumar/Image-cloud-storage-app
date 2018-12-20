const express = require("express");
const router = express.Router();
const {Post} = require("../models/post");
const {authenticate} = require('../middleware/authenticate');
const {ObjectID} = require('mongodb');

// router.get("/", (req, res) => {
//     res.send("entered post url");
// });

// @route POST /posts
// @desc add image
router.post('/', authenticate, (req,res) => {
    var post = new Post({
        text: req.body.text,
        _creator: req.user._id
    });
    post.save().then((data) => {
        res.status(200).send(data);
    }, (err) => {
        res.status(400).send(err);
    })
});

// @route GET /posts
// @desc Loads all post
router.get('/', authenticate, (req, res) => {
    Post.find({
        _creator: req.user.id
    }).then((posts) => {
        res.status(200).send({posts});
    }, (err) => {
        res.status(400).send(err);
    })
});

// @route GET /posts/123
// @desc load 1 post
router.get('/:id', authenticate,(req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        return res.status(404).send("id not valid")
    }

    Post.findOne({
        _id: id,
        _creator: req.user._id
    }).then( (data) => {
        if(!data){
            res.status(400).send("no id found");
        }
        res.status(200).send({data});
    }).catch((e) => {
        res.status(400).send();
    });
})

// @route DELETE /posts/id
// @desc delete 1 post
router.delete('/:id', authenticate, (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send("send valid id");
    }

    Post.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((result) => {
        if(!result){
            return res.status(404).send("no post found");
        }
        res.send({result});
    }).catch((e) => {
        res.status(400).send("err in connecting", e);
    })
});

// @route PATCH /posts/id
// @desc Update 1 post
// app.patch('/:id', authenticate, (req, res) => {
//     var id = req.params.id;
//     var body = _.pick(req.body, ['text', 'completed']);
    
//     if(!ObjectID.isValid(id)){
//         return res.status(404).send("send valid id");
//     }

//     if(_.isBoolean(body.completed) && body.completed){
//         body.completedAt = new Date().getTime();
//     } else {
//         body.completed = false;
//         body.completedAt = null;
//     } 

//     Todo.findOneAndUpdate( {_id : id, _creator: req.user._id}, {$set: body}, {new: true}).then((data) =>{
//         if(!data){
//             return res.status(404).send();
//         }

//         res.send({data});
//     }).catch((e) => {
//         res.status(400).send();
//     })
// });

module.exports = router;