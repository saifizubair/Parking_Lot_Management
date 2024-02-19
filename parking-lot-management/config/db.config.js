const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('parking_lot_management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
