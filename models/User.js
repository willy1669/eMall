var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : String,
    email : {type: String, unique: true},
    password : String,
});

module.exports = mongoose.model('User', userSchema);