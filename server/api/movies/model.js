const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number
  },
  video: {
    type: Boolean
  },
  voteAverage: {
    type: Number
  },
  popularity: {
    type: Number
  },
  posterPath: {
    type: String
  },
  originalLanguage: {
    type: String
  },
  originalTitle: {
    type: String
  },
  genreIds: [
    {
      type: Number
    }
  ],
  backdropPath: {
    type: String
  },
  adult: {
    type: Boolean
  },
  overview: {
    type: String
  },
  releaseDate: {
    type: String
  }
});

module.exports = mongoose.model('movie', Movie);
