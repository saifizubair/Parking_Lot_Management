import React, { useState } from 'react';
import axios from 'axios';
import ParkingForm from './components/ParkingForm'; // Import the ParkingForm component
import AllocateForm from './components/AallocateForm'; // Import the AllocateForm component
import DeallocateForm from './components/DeallocateForm'; // Import the DeallocateForm component

function App() {
  const [message, setMessage] = useState('');
  const [allocateFormVisible, setAllocateFormVisible] = useState(false);
  const [deallocateFormVisible, setDeallocateFormVisible] = useState(false);
  const [onboardFormVisible, setOnboardFormVisible] = useState(false); // State to manage visibility of the onboard form
  const [carSize, setCarSize] = useState('');
  const [slotId, setSlotId] = useState('');

  const handleOnboard = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/parking/onboard', formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage('Operation failed.');
    }
  };

  const handleAllocate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/parking/allocate', { carSize });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage('Allocation failed.');
    }
  };

  const handleDeallocate = async (slotId) => {
    try {
      const response = await axios.post('http://localhost:3000/parking/deallocate', { slotId });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage('Deallocation failed.');
    }
  };

  const toggleAllocateForm = () => {
    setAllocateFormVisible(!allocateFormVisible);
  };

  const toggleDeallocateForm = () => {
    setDeallocateFormVisible(!deallocateFormVisible);
  };

  const toggleOnboardForm = () => {
    setOnboardFormVisible(!onboardFormVisible);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Parking Lot Management</h1>
      <button className="btn btn-primary mr-2" onClick={toggleOnboardForm}>Onboard</button>
      {onboardFormVisible && (
        <ParkingForm onSubmit={handleOnboard} className="custom-form" />
      )}
      {!onboardFormVisible && (
        <>
          <button className="btn btn-primary mr-2" onClick={toggleAllocateForm}>Allocate Slot</button>
          <button className="btn btn-primary" onClick={toggleDeallocateForm}>Deallocate Slot</button>
        </>
      )}
      {allocateFormVisible && (
        <AllocateForm
          carSize={carSize}
          setCarSize={setCarSize}
          onSubmit={(e) => { e.preventDefault(); handleAllocate(); }}
          className="custom-form"
        />
      )}
      {deallocateFormVisible && (
        <DeallocateForm
          slotId={slotId}
          setSlotId={setSlotId}
          onSubmit={(slotId) => handleDeallocate(slotId)}
          className="custom-form"
        />
      )}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default App;
