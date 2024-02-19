const ParkingLotService = require('../services/parkingLotServices');

// Controller functions for handling parking lot operations
exports.onboardParkingLot = (req, res) => {
  const { name, floors } = req.body;

  ParkingLotService.onboardParkingLot(name, floors)
    .then(result => {
      res.status(201).json({ message: 'Parking lot onboarded successfully', data: result });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

exports.allocateSlot = (req, res) => {
  const { carSize } = req.body;

  ParkingLotService.allocateSlot(carSize)
    .then(slot => {
      res.status(200).json({ message: 'Slot allocated successfully', slot: slot });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

exports.deallocateSlot = (req, res) => {
  const { slotId } = req.body;

  ParkingLotService.deallocateSlot(slotId)
    .then(() => {
      res.status(200).json({ message: 'Slot deallocated successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
