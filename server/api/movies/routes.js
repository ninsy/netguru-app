const router = require('express').Router();

const ctrl = require('./ctrl');
const comments = require('../comments/routes');

router.param('id', ctrl.attachMovie);
router.use('/:movieId/comments', comments);

router.route('/')
  .get(ctrl.fetch)
  .post(ctrl.remoteRequest);

router.route('/:id')
  .get(ctrl.fetchById)

module.exports = router;
