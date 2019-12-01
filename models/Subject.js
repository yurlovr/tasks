const mongoose = require('mongoose');
const connection = require('../libs/connection');
const Class = require('../models/Class');

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
        ref: 'Class'
    }
],
  category: [
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