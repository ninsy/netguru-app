const Comment = require('./model');

const endpointErrors = {
  "create": {
    _400: `Please ensure to provide 'body' field in request body.
          Field body should be of type string, at least 2 characters long,
          maximum 255 characters long.`,
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
      return Promise.reject(endpointErrors._400);
    }
    return Comment.create({body, movieId});
  }
};

module.exports = vm;
