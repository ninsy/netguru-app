const router = require('express').Router();
const ctrl = require('./ctrl');

router.route('/')
  .get(ctrl.list)
  .post(ctrl.create);

module.exports = router;
