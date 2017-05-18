'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblappliances = sequelize.define('tblappliances', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    installed: DataTypes.INTEGER,
    warrantyend: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    propertyid: DataTypes.INTEGER,
    unitnumber: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
    	  tblappliances.belongsTo(models.tblproperties, { foreignKey: 'propertyid', targetKey: 'id'});
    	  tblappliances.belongsTo(models.tblunits, { foreignKey: 'unitnumber', targetKey: 'number' });
      }
    }
  });
  return tblappliances;
};