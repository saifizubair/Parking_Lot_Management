const express = require('express');
const router = express.Router();
const parkingLotController = require('../controllers/parkingLotController');

router.post('/onboard', parkingLotController.onboardParkingLot);
router.post('/allocate', parkingLotController.allocateSlot);
router.post('/deallocate', parkingLotController.deallocateSlot);

module.exports = router;
