const mongoose = require('mongoose');

const schema = new mongoose.Schema({ description: String, done: Boolean, listId: String });

module.exports = mongoose.model('tasks', schema);
