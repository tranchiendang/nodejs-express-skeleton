'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblproperties = sequelize.define('tblproperties', {
    name: DataTypes.STRING,
    addr1: DataTypes.TEXT,
    addr2: DataTypes.TEXT,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    propertytype: DataTypes.INTEGER,
    subtype: DataTypes.INTEGER,
    yearbuilt: DataTypes.INTEGER,
    reserveamt: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    note: DataTypes.TEXT,
    stateid: DataTypes.INTEGER,
    rentalownerid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    	  tblproperties.belongsTo(models.tblstates, { foreignKey: 'stateid', targetKey: 'id'});
    	  tblproperties.belongsTo(models.tblowners, { foreignKey: 'rentalownerid', targetKey: 'id'});
      }
    }
  });
  return tblproperties;
};