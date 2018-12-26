var Promise = require('bluebird');
var pgp = require('pg-promise');
var config = require('../config.json');

const camelizeColumns = (data) => {
  const template = data[0];

  for (let prop in template) {
    const camel = pgp.utils.camelize(prop);

    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

const postgres = pgp({
  promiseLib: Promise,
  receive: (data, result, e) => { camelizeColumns(data); }
});

const connection = postgres(config.dbUri);

module.exports = connection;