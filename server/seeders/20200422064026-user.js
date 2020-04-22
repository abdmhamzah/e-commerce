'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let user = [{
      name: 'admin',
      email: 'admin@admin.com',
      password: hashPassword('admin'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    return queryInterface.bulkInsert('Users', user, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
