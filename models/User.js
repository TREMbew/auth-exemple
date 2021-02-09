const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    firstname : String,
    lastname : String,
    phone : Number,
    email : String,
    password : String
});

module.exports = mongoose.model('user', UserSchema);