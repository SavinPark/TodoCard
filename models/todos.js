'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {}

  Todos.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    done: DataTypes.STRING,
    edit: DataTypes.STRING,
    delete: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};