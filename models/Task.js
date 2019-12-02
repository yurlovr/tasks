const mongoose = require('mongoose');
const connection = require('../libs/connection');

const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  taskNumber: {
    type: Number,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  classNumber: {
    type: mongoose.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});


module.exports = connection.model('Task', taskSchema);