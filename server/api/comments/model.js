const mongoose = require('mongoose');

// TODO: add todo validation - hooks!

const Comment = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    max: 255,
    min: 2
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true
  }
});

module.exports = mongoose.model('comment', Comment);
