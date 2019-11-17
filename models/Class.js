const mongoose = require('mongoose');
const connection = require('../libs/connection');

const calssSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  classNumber: {
    type: String,
    required: true
  },
  subject: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Subject'
    }
  ]
});

calssSchema.index(
    {classNumber: 'text'},
    {
      name: 'TextSearchIndex',
    }
  );


module.exports = connection.model('Class', calssSchema);