const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        default: null
    }
});

var Post = mongoose.model('Post', postSchema);

module.exports = {Post}