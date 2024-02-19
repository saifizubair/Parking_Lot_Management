const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your database connection
const sequelize = new Sequelize('parking_lot_management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define your Sequelize models
const ParkingBuilding = sequelize.define('parking_building', {
  building_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Floor = sequelize.define('floor', {
  floor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  building_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  floor_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  small_slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medium_slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  large_slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  xl_slots: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const ParkingSlots = sequelize.define('parking_slots', {
  slot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  floor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  slot_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.ENUM('Small', 'Medium', 'Large', 'XLarge'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Occupied', 'Free'),
    allowNull: false
  }
});
module.exports = { ParkingBuilding, Floor, ParkingSlots };
// Define associations between models if needed

// Synchronize models with the database
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Models synchronized successfully');
//     process.exit(0); // Exit the script after successful synchronization
//   })
//   .catch(error => {
//     console.error('Error synchronizing models:', error);
//     process.exit(1); // Exit with a non-zero code to indicate failure
//   });
