const mongoose = require('mongoose');
const connection = require('../libs/connection');

const categorySchema = new mongoose.Schema({
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

categorySchema.index(
    {title: 'text'},
    {
      name: 'TextSearchIndex',
    }
  );
  
  module.exports = connection.model('Category', categorySchema);