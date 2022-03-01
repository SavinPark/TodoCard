'use strict';

const initialTodoData = require("../src/InitialTodoData");

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Todos', initialTodoData, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Todos', null, {});
  }
};

