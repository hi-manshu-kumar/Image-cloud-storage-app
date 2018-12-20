const express = require("express");
const router = express.Router();
const {Post} = require("../models/post");
const {authenticate} = require('../middleware/authenticate');

router.get("/", (req, res) => {
    res.send("entered post url");
});

// @route POST /posts
// @desc add image
router.post('/', authenticate, (req,res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((data) => {
        res.status(200).send(data);
    }, (err) => {
        res.status(400).send(err);
    })
});

// @route GET /posts
// @desc Loads all post
router.get('/', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user.id
    }).then((todos) => {
        res.status(200).send({todos});
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

    Todo.findOne({
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

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((result) => {
        if(!result){
            return res.status(404).send("no todo found");
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