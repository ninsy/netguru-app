const router = require('express').Router();

const ctrl = require('./ctrl');
const comments = require('../comments/routes');

router.param('id', ctrl.getById);
router.use('/:movieId/comments', comments);

router.route('/')
  .get(ctrl.fetch)
  .post(ctrl.remoteRequest);

module.exports = router;
