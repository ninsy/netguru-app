const { URL } = require('url');

const config = {
  dev: 'dev',
  prod: 'prod',
  port: process.env.PORT || 5000,
  apiUrl: new URL(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}`),
  env: process.env.NODE_ENV || 'dev'
}

const envConfig = require(`./${config.env}`);
module.exports = Object.assign(config, envConfig);
