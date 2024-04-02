'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('earnings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      basic_pay: {
        type: Sequelize.NUMERIC
      },
      overtime: {
        type: Sequelize.NUMERIC
      },
      late: {
        type: Sequelize.NUMERIC
      },
      nsd: {
        type: Sequelize.NUMERIC
      },
      ts_allowance: {
        type: Sequelize.NUMERIC
      },
      meal_allowance: {
        type: Sequelize.NUMERIC
      },
      gross_pay: {
        type: Sequelize.NUMERIC
      },
      employee_name: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('earnings');
  }
};