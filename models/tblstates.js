'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblstates = sequelize.define('tblstates', {
    shortname: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tblstates;
};