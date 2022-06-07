const Sequelize = require('sequelize');

const db = require('../../models/index');

module.exports = db.sequelize.define('stores', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  watermark_image: Sequelize.STRING
}, {
  timestamps: false
});
