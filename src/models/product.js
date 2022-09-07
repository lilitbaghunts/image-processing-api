const Sequelize = require('sequelize');

const db = require('../../models/index');

module.exports = db.sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  store_id: Sequelize.INTEGER,
  title: Sequelize.STRING,
  image: Sequelize.STRING
}, {
  timestamps: false
});
