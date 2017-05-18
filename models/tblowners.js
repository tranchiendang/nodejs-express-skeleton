'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblowners = sequelize.define('tblowners', {
    firstname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tblowners;
};