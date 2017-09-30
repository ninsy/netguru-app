const Comment = require('./model');
const Movie = require('../movies/model');

const endpointErrors = {
  "create": {
    _400: `Please ensure to provide 'body' field in request body.
          Field body should be of type string, at least 2 characters long,
          maximum 255 characters long.`,
    },
    _404: (id) => `You cannot create comment for movie with id ${id}, it doesn't exist`,
  "list": {
    _400: (id) => `You have provided malformed ObjectId: ${id}, please check MongoDB documentation for further details`,
    _404: (id) => `Cannot list comments for movie with id: ${id}, it doesn't exist`,
  }
};

function validateListBody(body) {
  return body && body.length;
}

const vm = {
  list({movieId}) {
    let searchObj = {
      firstParam: {},
      secondParam: {}
    };
    if(movieId) {
      searchObj.firstParam.movieId = movieId;
      searchObj.secondParam.movieId = 0;

      return Movie.findById(movieId)
        .then(result => {
          if(!result) {
            return Promise.reject({status: 404, message: endpointErrors.list._404(movieId)});
          }
          return Promise.resolve();
        })
        .then(_ => {
          return Comment.find(searchObj.firstParam, searchObj.secondParam)
            .then(comments => {
              return {
                comments,
                movieId
              }
            });
        })
        .catch(err => {
          if(err.name === "CastError") {
            return {
              status: 400,
              name: err.name,
              message: endpointErrors.list._400(movieId)
            }
          }
        })
    }
    return Comment.find(searchObj.firstParam, searchObj.secondParam)
      .then(comments => {
        return {
          comments,
          movieId
        }
      });

  },
  create({body, movieId}) {
    if(!validateListBody(body)) {
      return Promise.reject(endpointErrors.create._400);
    }
    return Movie.findById(movieId)
      .then(result => {
        if(!result) {
          return Promise.reject({status: 404, message: endpointErrors.create._404(movieId)});
        }
        return Promise.resolve();
      })
      .then(_ => {
        return Comment.create({body, movieId}).catch(err => {
          if(err.name === 'ValidationError') {
            return {
              status: 400,
              name: err.name,
              message: err.message
            }
          }
          return err;
        })
      });
  }
};

module.exports = vm;
