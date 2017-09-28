const app = require('express')();
const api = require('./api/api');
const config = require('./config/config');

require('mongoose').connect(config.db.url, { useMongoClient: true });

require('./middleware/appMiddleware')(app);
app.use('/api', api);
require('./middleware/errMiddleware')(app);

module.exports = app;
