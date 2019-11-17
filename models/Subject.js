const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subjectSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  subject: {
    type: String,
    required: true
  },
  classNumber: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
],
  categoty: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
  ]
});

subjectSchema.index(
    {subject: 'text'},
    {
      name: 'TextSearchIndex',
    }
  );


module.exports = connection.model('Subject', subjectSchema);