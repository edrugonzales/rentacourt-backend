'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtr', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      employee_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      employee_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time_in: {
        type: Sequelize.STRING
      },
      time_out: {
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      no_of_hours: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      late: {
        type: Sequelize.INTEGER
      },
      overtime: {
        type: Sequelize.INTEGER
      },
      days: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dtr');
  }
};