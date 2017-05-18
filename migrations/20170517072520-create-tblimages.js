'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tblimages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      tablename: {
        type: Sequelize.STRING,
        comment: 'name of associated table: tblproperties, tbltasks, ...'
      },
      objectid: {
        type: Sequelize.INTEGER,
        comment: 'if of property or task, ...'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tblimages');
  }
};