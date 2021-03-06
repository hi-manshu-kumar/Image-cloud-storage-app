require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');


var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
};

UserSchema.methods.generateAuthToken = function() {         //instance method
    let user = this;
    let access = 'auth';
    let jwtToken = process.env.JWT_secret;
    let token = jwt.sign({_id: user._id.toHexString(), access}, jwtToken, { expiresIn: 7*24*60*60 }).toString();              //7days

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {             
    let user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function(token) {          //model method
    let User = this;
    let decoded;
    let jwtToken = process.env.JWT_secret;
    
    try{
        decoded = jwt.verify(token, jwtToken, {maxAge: 24 * 60 * 60 });    //can be used in email verification and then expire after time 5h
    } catch(e){
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({email}).then((user)=> {    
        if(!user) {
            return Promise.reject({e: 'no user found'});
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    resolve(user);
                } else{
                    reject(err);
                }
            });
        });
    }).catch(err => Promise.reject(err));
};

UserSchema.pre('save', function(next) {
    let user =this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash)=> {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = {User}