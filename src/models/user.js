const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: String,
    mail: String,
    phone: String,
    pass: String,
    active: Boolean
},
{
    collection: 'users'
});

module.exports = mongoose.model('User', User);