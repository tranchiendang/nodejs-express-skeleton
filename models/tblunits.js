'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblunits = sequelize.define('tblunits', {
    number: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    marketrent: DataTypes.DOUBLE,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    propertyid: DataTypes.INTEGER,
    stateid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    	  tblunits.belongsTo(models.tblproperties, { foreignKey: 'propertyid', targetKey: 'id' });
    	  tblunits.belongsTo(models.tblstates, { foreignKey: 'stateid', targetKey: 'id' });
      }
    }
  });
  return tblunits;
};