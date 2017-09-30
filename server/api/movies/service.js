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
    _400: "Malformed input data: please provide appropriate 'title' field in request body.",
    _404: (title) => `Couldn't match any film to passed title: ${title}`
  }
};

function validateRemoteBody(body) {
  return body.title && Object.keys(body).length === 1 && typeof body.title === "string";
}

function querify(requestedTitle) {
  return requestedTitle.replace(/\s/g,'').toLowerCase();
}

function simpleFetchQueryParsing(queryStringObject) {
  let copy = Object.assign({}, queryStringObject);
  Object.keys(copy).forEach(key => {
    copy[key] = copy[key].split(' ');
  });
  return copy;
}

function transformRemoteAPIResponse({results}) {
  let copy = Object.assign([], results);
  copy.forEach(movieObj => {
    Object.entries(movieObj)
      .forEach(([movieObjKey, movieObjVal]) => {
        movieObj[camelCase(movieObjKey)] = movieObjVal
      })
  });
  return copy;
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
    const queryParams = simpleFetchQueryParsing(query);
    let dbQuery = Movie.find({});
    if(queryParams.order) {
      dbQuery.sort(`${queryParams['order'][1] === 'desc' ? '-' : '+'}${queryParams['order'][0]}`)
    }
    if(query.limit) {
      dbQuery.limit(parseInt(queryParams['limit']));
    }
    return dbQuery.exec();
  },
  remoteRequest({body}) {
    if(!validateRemoteBody(body)) {
      return Promise.reject({status: 400, message: endpointErrors.remoteRequest._400});
    }
    return axios.get(`${config.apiUrl}&query=${querify(body.title)}`)
      .then(response => {
        if(!response.data.results.length) {
          return Promise.reject({status: 404, message: endpointErrors.remoteRequest._404(body.title)});
        }
        let filteredResponse = transformRemoteAPIResponse(response.data);
        delete filteredResponse.id;
        return Movie.create(filteredResponse);
      });
  }
};

module.exports = vm;
