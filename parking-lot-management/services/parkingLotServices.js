const db = require('../config/db.config');
 const { ParkingBuilding, Floor, ParkingSlots } = require('../models/parkingLotModel');


// Onboard a new parking lot
exports.onboardParkingLot = async (name, floors) => {
  let transaction;
  try {
    transaction = await db.transaction();

    // Extract name from the parameters
    const parkingLotName = name;
    if (!parkingLotName) {
      throw new Error('Name is required for parking lot');
    }

    // Create parking building
    const parkingBuilding = await ParkingBuilding.create({ name: parkingLotName }, { transaction });

    // Create floors and associated slots
    for (const floorData of floors) {
      const { floorNumber, totalSlots, smallSlots, mediumSlots, largeSlots, xlSlots } = floorData;

      const floor = await Floor.create({
        building_id: parkingBuilding.building_id,
        floor_number: floorNumber,
        total_slots: totalSlots,
        small_slots: smallSlots,
        medium_slots: mediumSlots,
        large_slots: largeSlots,
        xl_slots: xlSlots
      }, { transaction });

      // Create slots for this floor
      await createSlotsForFloor(floor, transaction);
    }

    await transaction.commit();
    return { parkingBuilding, floors };
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error('Failed to onboard parking lot: ' + error.message); // Include error message in the thrown error
  }
};

// Helper function to create slots for a floor
const createSlotsForFloor = async (floor, transaction) => {
  const slots = [];
  let slotNumber = 1;

  for (let i = 0; i < floor.total_slots; i++) {
    let size;
    if (i < floor.small_slots) size = 'Small';
    else if (i < floor.small_slots + floor.medium_slots) size = 'Medium';
    else if (i < floor.small_slots + floor.medium_slots + floor.large_slots) size = 'Large';
    else size = 'XLarge';

    slots.push({
      floor_id: floor.floor_id,
      slot_number: slotNumber++,
      size: size,
      status: 'Free'
    });
  }

  await ParkingSlots.bulkCreate(slots, { transaction });
};

// Allocate a slot to a car
exports.allocateSlot = async (carSize) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const slot = await ParkingSlots.findOne({
      where: { size: carSize, status: 'Free' },
      order: [['floor_id', 'ASC'], ['slot_number', 'ASC']],
      transaction
    });

    if (slot) {
      await slot.update({ status: 'Occupied' }, { transaction });
      await transaction.commit();
      return slot;
    } else {
      await transaction.rollback();
      throw new Error('No available slot found');
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error('Failed to allocate slot');
  }
};

// Deallocate a slot
exports.deallocateSlot = async (slotId) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const slot = await ParkingSlots.findByPk(slotId, { transaction });

    if (slot) {
      await slot.update({ status: 'Free' }, { transaction });
      await transaction.commit();
      return 'Slot deallocated successfully';
    } else {
      await transaction.rollback();
      throw new Error('Slot not found');
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error('Failed to deallocate slot');
  }
};
