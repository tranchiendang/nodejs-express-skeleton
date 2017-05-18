'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tblproperties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      addr1: {
        type: Sequelize.TEXT
      },
      addr2: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      propertytype: {
        type: Sequelize.INTEGER,
        comment: '1: residential, 2: commercial'
      },
      subtype: {
        type: Sequelize.INTEGER,
        comment: 'If propertytype = 1 then load: Single-Family, Multi-Family, Condo/Townhouse; Else: load: Office, Industrial, Retail, Shopping center, Storage, Packing space'
      },
      yearbuilt: {
        type: Sequelize.INTEGER
      },
      reserveamt: {
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.TEXT
      },
      note: {
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
      stateid: {
    	  type: Sequelize.INTEGER,
    	  references: {
    		  model: 'tblstates',
    		  key: 'id'
    	  },
    	  onDelete: 'set null'
      },
      rentalownerid: {
    	  type: Sequelize.INTEGER,
    	  references: {
    		  model: 'tblowners',
    		  key: 'id'
    	  },
    	  onDelete: 'set null'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tblproperties');
  }
};