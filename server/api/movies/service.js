const axios = require('axios');
const { URL } = require('url');
const camelCase = require('lodash.camelcase');

const Movie = require('./model');
const config = require('../../config/config');

const endpointErrors = {
  "getById": {
    _404: (id) => `No movie with given id: ${id}`
  },
  "remoteRequest": {
    _400: "Malformed input data: please provide appropriate 'title' field in request body."
  }
};

function validateRemoteBody(body) {
  return body.title && Object.keys(body).length === 1 && typeof body.tile === "string";
}

function transformRemoteAPIResponse({results}) {
  return results
    .map(movieObj =>
       Object.keys(movieObj)
        .map(movieObjKey => camelCase(movieObjKey))
      );
}

const vm = {
  getById({id}) {
    return Movie.findById(id)
      .then(movie => {
        if(!movie) {
          return Promise.reject(endpointErrors.getById._404(id));
        }
        return movie;
      })
      .catch(err => err);
  },
  fetch({query}) {
    return Movie.find(query);
  },
  remoteRequest({body}) {
    if(!validateRemoteBody(body)) {
      return Promise.reject({status: 400, message: endpointErrors.remoteRequest._400});
    }
    return axios.get(config.apiUrl)
      .then(response => {
        let filteredResponse = transformRemoteAPIResponse(response);
        Movie.create(filteredResponse); // async call to db
        return filteredResponse
      })
      .catch(err => err);
  }
};

module.exports = vm;
