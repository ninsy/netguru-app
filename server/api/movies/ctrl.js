const service = require('./service');

const ctrl = {
  attachMovie(req, res, next, id) {
    return service.getById({id: req.id})
      .then(movie => {
        req.movie = movie;
        next();
      })
      .catch(next);
  },
  fetchById(req, res, next) {
    return res.status(200).json(req.movie);
  },
  fetch(req, res, next) {
    return service.fetch({query: req.query})
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(next);
  },
  remoteRequest(req, res, next) {
    return service.remoteRequest({body: req.body})
      .then(result => {
          return res.status(200).json(result);
      })
      .catch(next);
  }
};

module.exports = ctrl;
