const router = require('express').Router();

const ctrl = require('./ctrl');

router.param('id', ctrl.attachMovie);

router.route('/')
  .get(ctrl.fetch)
  .post(ctrl.remoteRequest);

router.route('/:id')
  .get(ctrl.fetchById);

module.exports = router;
