const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/db.config');

// Define the ParkingLot model
const ParkingLot = db.define('parking_lot', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the Floor model
const Floor = db.define('floor', {
  floorNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalSlots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  smallSlots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mediumSlots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  largeSlots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  xlSlots: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define the Slot model
const Slot = db.define('slot', {
  slotNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.ENUM('Small', 'Medium', 'Large', 'XLarge'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Occupied', 'Free'),
    allowNull: false,
    defaultValue: 'Free'
  }
});

// Define associations between models
ParkingLot.hasMany(Floor);
Floor.belongsTo(ParkingLot);

Floor.hasMany(Slot);
Slot.belongsTo(Floor);

// Synchronize models with the database
(async () => {
  await db.sync({ alter: true });
  console.log('Models synchronized successfully');
})();

module.exports = { ParkingLot, Floor, Slot };
