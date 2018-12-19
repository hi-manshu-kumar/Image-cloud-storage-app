var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.createConnection(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, `connection error:`));
db.once('open', function() {
    console.log(`Connection to the database up and running`);
});

module.exports = {mongoose};