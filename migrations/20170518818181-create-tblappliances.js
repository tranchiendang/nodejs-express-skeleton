'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tblappliances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      installed: {
        type: Sequelize.INTEGER
      },
      warrantyend: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      propertyid: {
    	  type: Sequelize.INTEGER,
    	  references: {
    		  model: 'tblproperties',
    		  key: 'id'
    	  },
    	  onDelete: 'set null'
      },
      unitnumber: {
    	  type: Sequelize.INTEGER,
    	  references: {
    		  model: 'tblunits',
    		  key: 'number'
    	  },
    	  onDelete: 'set null'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tblappliances');
  }
};