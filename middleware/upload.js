const multer = require('multer');
const path = require('path');
const Datauri = require('datauri');

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination: './public/files',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const storage = multer.memoryStorage();

//init
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200000
    },
    fileFilter: function (req, file, callback) {
        validateFile(file, callback);
    }
}).single('myImage');


var validateFile = function (file, cb) {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}

module.exports = {upload, dataUri};