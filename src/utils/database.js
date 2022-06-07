const Sequelize = require("sequelize");
const dbConfig = require("../../config/config")

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
});

module.exports = sequelize;
