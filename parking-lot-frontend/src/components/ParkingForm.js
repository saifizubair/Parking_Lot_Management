import React, { useState } from 'react';

function ParkingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    floors: [
      { floorNumber: '', totalSlots: '', smallSlots: '', mediumSlots: '', largeSlots: '', xlSlots: '' }
    ]
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const floors = [...formData.floors];
    floors[index][name] = value;
    setFormData({ ...formData, floors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addFloor = () => {
    setFormData({ ...formData, floors: [...formData.floors, { floorNumber: '', totalSlots: '', smallSlots: '', mediumSlots: '', largeSlots: '', xlSlots: '' }] });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <input type="text" className="form-control" name="name" placeholder="Parking Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      </div>
      {formData.floors.map((floor, index) => (
        <div key={index} className="mb-3">
          <h3>Floor {index + 1}</h3>
          <input type="number" className="form-control mb-2" name="floorNumber" placeholder="Floor Number" value={floor.floorNumber} onChange={(e) => handleInputChange(e, index)} required />
          <input type="number" className="form-control mb-2" name="totalSlots" placeholder="Total Slots" value={floor.totalSlots} onChange={(e) => handleInputChange(e, index)} required />
          <input type="number" className="form-control mb-2" name="smallSlots" placeholder="Small Slots" value={floor.smallSlots} onChange={(e) => handleInputChange(e, index)} required />
          <input type="number" className="form-control mb-2" name="mediumSlots" placeholder="Medium Slots" value={floor.mediumSlots} onChange={(e) => handleInputChange(e, index)} required />
          <input type="number" className="form-control mb-2" name="largeSlots" placeholder="Large Slots" value={floor.largeSlots} onChange={(e) => handleInputChange(e, index)} required />
          <input type="number" className="form-control mb-2" name="xlSlots" placeholder="XL Slots" value={floor.xlSlots} onChange={(e) => handleInputChange(e, index)} required />
        </div>
      ))}
      <button type="button" onClick={addFloor} className="btn btn-primary mr-2">Add Floor</button>
      <button type="submit" className="btn btn-success">Onboard</button>
    </form>
  );
}

export default ParkingForm;
