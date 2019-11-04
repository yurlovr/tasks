const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
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
  classNumber: {
    type: Number,
    required: true
  },
  categoories: [subCategorySchema],
});


// taskSchema.index(
//   {taskNumber: 'text'},
//   {
//     default_language: 'russian',
//     name: 'TextSearchIndex',
//   }
// );

module.exports = connection.model('Task', taskSchema);
module.exports = connection.model('subCategory', subCategorySchema);