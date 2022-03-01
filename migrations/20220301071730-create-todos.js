'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.STRING
      },
      edit: {
        type: Sequelize.STRING
      },
      delete: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'), // 기본값) 현재시간이 자동으로 들어가도록 설정
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'), // 기본값) 현재시간이 자동으로 들어가도록 설정
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};

