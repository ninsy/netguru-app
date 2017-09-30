const router = require('express').Router({mergeParams: true});

const movies = require('./movies/routes');
const comments = require('./comments/routes');

router.use('/movies', movies);
router.use('/comments', comments);

module.exports = router;
