const router = require('express').Router({mergeParams: true});

const movies = require('./movies/routes');

router.use('/movies', movies);

module.exports = router;
