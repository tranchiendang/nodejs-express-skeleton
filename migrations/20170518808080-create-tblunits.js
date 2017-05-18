'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tblunits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER,
        unique: true
      },
      size: {
        type: Sequelize.INTEGER
      },
      marketrent: {
        type: Sequelize.DOUBLE
      },
      address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      bedrooms: {
        type: Sequelize.INTEGER
      },
      bathrooms: {
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
      stateid: {
    	  type: Sequelize.INTEGER,
    	  references: {
    		  model: 'tblstates',
    		  key: 'id'
    	  },
    	  onDelete: 'set null'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tblunits');
  }
};