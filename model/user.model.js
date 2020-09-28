const mongoose = require('mongoose')

const UserModelSchema = new mongoose.Schema({
    //userName: String,
    userName: String,
    password: String,
    email: String
});


module.exports = mongoose.model('User', UserModelSchema);
