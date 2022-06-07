'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      store_id: Sequelize.INTEGER,
      title: Sequelize.STRING,
      image: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
  return queryInterface.dropTable('products');
  }
};
