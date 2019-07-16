'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    name: DataTypes.STRING
  }, {});
  status.associate = function(models) {
    // associations can be defined here
  };
  return status;
};