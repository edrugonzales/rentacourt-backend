'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id : {
        type: Sequelize.STRING,
        allowNull: false
      },
       googleid : {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      verificationcode: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resettoken: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      isverified: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'false'
      },
      isonboarded: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'false'
      },
      createdat: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedat: {
        type: Sequelize.DATE,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isarchived: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accesstoken: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};