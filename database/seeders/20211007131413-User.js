'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      id: '5495153e-a96c-4425-bc0f-45e2ea45fdfd',
      firstname: 'John',
      lastname: 'Doe',
      company: 'Star Concorde Group',
      email:'johnDoe@gmail.com',
      phone:'9564409300',
      password:'d868b427a83a3c2ae56e13a1195b6dc15237ffff',
      role_id: 1,
      isverified: 'false',
      isonboarded: 'false',
      createdat: new Date(),
      updatedat: new Date(),
      salt: '5495153e-a96c-4425-bc0f-45e2ea45fdfd',
      isarchived: 'false',
      accesstoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0OTUxNTNlLWE5NmMtNDQyNS1iYzBmLTQ1ZTJlYTQ1ZmRmZCIsImVtYWlsIjoiYWIuZG9tYWNlbmFAc3BhcmtsZXMuY29tLnBoIiwiaWF0IjoxNjMzMzMzMjkzLCJleHAiOjE2MzM0MTk2OTN9.oJOlq7EBdoao5IFt6UyYlTXbc3IVeIe6pnrfknCfEoA'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {});

  }
};
