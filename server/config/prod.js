const production = {
  logging: false,
  db: {
    url: process.env.MONGODB_URI
  }
};

module.exports = production;
