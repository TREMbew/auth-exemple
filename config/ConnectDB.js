const mongoose = require('mongoose');
require('dotenv').config()

const ConnectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, err => {
        if(err) console.log(err)
        console.log('Database is connected with server');   
    });
}

module.exports = ConnectDB