import React from 'react';

function AllocateForm({ carSize, setCarSize, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="carSize">Car Size:</label>
      <input type="text" id="carSize" value={carSize} onChange={(e) => setCarSize(e.target.value)} required />
      <button type="submit">Allocate</button>
    </form>
  );
}

export default AllocateForm;
