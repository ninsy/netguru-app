const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config/config');

module.exports = (app) => {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ? err.status : 500).json({
      message: err.message ? err.message : "Internal server error",
      stack: config.env === config.dev ? err.stack : "Stack only provided in development environment"
    });
  })
};

