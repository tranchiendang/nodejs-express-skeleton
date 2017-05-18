'use strict';
module.exports = function(sequelize, DataTypes) {
  var tblimages = sequelize.define('tblimages', {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    tablename: DataTypes.STRING,
    objectid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tblimages;
};