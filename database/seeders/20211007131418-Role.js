'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        role: 'admin',
        createdat: new Date(),
        updatedat: new Date()
      }, 
      {
        id: 2,
        role: 'account_manager',
        createdat: new Date(),
        updatedat: new Date()
      },
      {
        id: 3,
        role: 'supervisor',
        createdat: new Date(),
        updatedat: new Date()
      },
      {
        id: 4,
        role: 'user',
        createdat: new Date(),
        updatedat: new Date()
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('roles', null, {});

  }
};
