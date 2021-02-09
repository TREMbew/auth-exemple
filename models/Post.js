const mongoose = require('mongoose');

const {Schema} = mongoose;

const PostSchema = new Schema({
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    title : String,
    description : String,
    created_at :{
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('post', PostSchema);