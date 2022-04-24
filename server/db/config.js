const { Sequelize } = require("sequelize");
const _config = require('../keys')

module.exports = new Sequelize(_config.pgDatabase, _config.pgUser, _config.pgPassword, {
  host: _config.pgHost,
  dialect: 'postgres',
});
