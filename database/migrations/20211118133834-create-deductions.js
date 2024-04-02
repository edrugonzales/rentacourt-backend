'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deductions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_name: {
        type: Sequelize.STRING
      },
      sss: {
        type: Sequelize.NUMERIC
      },
      phic: {
        type: Sequelize.NUMERIC
      },
      hdmf: {
        type: Sequelize.NUMERIC
      },
      sss_loan: {
        type: Sequelize.NUMERIC
      },
      hdmf_loan: {
        type: Sequelize.NUMERIC
      },
      total_deduction: {
        type: Sequelize.NUMERIC
      },
      net_pay: {
        type: Sequelize.NUMERIC
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('deductions');
  }
};