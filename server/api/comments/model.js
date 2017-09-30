const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 2
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true
  }
});

module.exports = mongoose.model('comment', Comment);
