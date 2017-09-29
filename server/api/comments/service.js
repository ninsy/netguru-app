const Comment = require('./model');
const Movie = require('../movies/model');

const endpointErrors = {
  "create": {
    _400: `Please ensure to provide both 'body' and 'movieId' fields in request body.
          Field body should be of type string, at least 2 characters long,
          maximum 255 characters long.`,
    }
};

function validateListBody(body) {
  return body && body.hasOwnProperty('body') && body.hasOwnProperty('movieId');
}

const vm = {
  list({movieId}) {
    if(movieId) {
      return Movie.findById(movieId)
        .populate('comments')
        .exec()
        .then(movie => {
          return {
            comments: movie.comments,
            movieId
          }
        });
    }
    return Comment.find({});

  },
  create({body}) {
    return Comment.create(body);
  }
};

module.exports = vm;
