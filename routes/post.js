require('dotenv').config();
const express = require("express");
const router = express.Router();
const {upload, dataUri} = require('../middleware/upload');
const {authenticate} = require('../middleware/authenticate');
const {Post} = require("../models/post");
const {ObjectID} = require('mongodb');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key   : process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// @route POST /post
// @desc add image
router.post('/', authenticate, (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.status(400).send( err);
        } else {
            if (req.file == undefined) {
                res.status(400).send("Error: No File Selected!");
            } else {

                const file = dataUri(req).content;
                cloudinary.uploader.upload(file).then((result) => {
                    const imagePath = result.url;
                    let flag = req.body.communityFlag == undefined ? false: true;
                    
                    var post = new Post({
                        title: req.body.title,
                        path: imagePath,
                        description: req.body.description,
                        _creator: req.user._id,
                        communityFlag: flag
                    });
                    post.save().then((data) => {
                        res.send(data);
    
                    }, (err) => {
                        res.status(400).send(err);
                    })
                })
            }
        }
    });
});

// @route GET /post
// @desc Loads all post from community
router.get('/', authenticate, (req, res) => {

    let sortBy = 'createdAt';
    let order = 'desc';
    Post.find({
        communityFlag: true
    })
    .sort([[sortBy, order]])
    .exec((err, posts) => { 
        if(err) return res.status(400).send(err);
         res.status(200).send(posts);
     });
});

// @route GET /post/user
// @desc Loads all post of loggedin user
router.get('/user', authenticate, (req, res) => {

    let sortBy = 'createdAt';
    let order = 'desc';
    Post.find({
        _creator: req.user._id
    })
    .sort([[sortBy, order]])
    .exec((err, posts) => { 
        if(err) return res.status(400).send(err);
         res.status(200).send(posts);
     });
});

// @route GET /post/123
// @desc load 1 post
router.get('/:id',  (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("id not valid")
    }

    Post.findOne({
        _id: id
        // _creator: req.user._id
    }).then((data) => {
        if (!data) {
            res.status(400).send("no id found");
        }
        res.status(200).send({
            data
        });
    }).catch((e) => {
        res.status(400).send();
    });
})

// @route DELETE /post/id
// @desc delete 1 post
router.delete('/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("send invalid id");
    }

    Post.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((result) => {
        if (!result) {
            return res.status(404).send("no post found");
        }
        let img =  result.path.match(/[\w-]+\.(jpg|png|jpeg|gif)/g)
        let image_id = img[0].split('.')[0];
        console.log(image_id);
        cloudinary.uploader.destroy(image_id, (error,resp) => {
            res.status(200).send({result});
        })
        // res.send({
        //     result
        // });
    }).catch((e) => {
        res.status(400).send("err in connecting", e);
    })
});

module.exports = router;