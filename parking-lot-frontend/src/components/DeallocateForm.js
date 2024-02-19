import React, { useState } from 'react';

function DeallocateForm({ onSubmit }) {
  const [slotId, setSlotId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(slotId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="slotId">Slot ID:</label>
      <input type="text" id="slotId" value={slotId} onChange={(e) => setSlotId(e.target.value)} required />
      <button type="submit">Deallocate</button>
    </form>
  );
}

export default DeallocateForm;
