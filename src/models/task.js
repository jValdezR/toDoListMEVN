const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    title: String,
    descripcion: String,
});

module.exports = mongoose.model('Task', Task);