const service = require('./service');

const ctrl = {
  list(req, res, next) {
    return service.list({movieId: req.query.movieId})
      .then(result => {
        res.status(200).json(result);
      }).catch(next);
  },
  create(req, res, next) {
    return service.create({body: req.body.commentBody, movieId: req.body.movieId})
      .then(newComment => {
        res.status(200).json(newComment);
      }).catch(next);
  }
};

module.exports = ctrl;
