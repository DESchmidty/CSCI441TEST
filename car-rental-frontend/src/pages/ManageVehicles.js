import React, { useState, useEffect } from 'react';
import API from '../api';

function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    isAvailable: false, // New state for availability
  });

  const fetchVehicles = () => {
    API.get('/vehicles').then(res => setVehicles(res.data));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = e => {
    if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/vehicles', form).then(() => {
      fetchVehicles();
      setForm({ make: '', model: '', year: '', pricePerDay: '', isAvailable: false });
    });
  };

  const handleDelete = id => {
    API.delete(`/vehicles/${id}`).then(fetchVehicles);
  };

  return (
    <div>
      <h1>Manage Vehicles</h1>

      <form onSubmit={handleSubmit}>
        <input name="make" value={form.make} onChange={handleChange} placeholder="Make" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
        <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Year" required />
        <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="Price Per Day" required />
        
        {/* Checkbox for availability */}
        <label>
          Available
          <input
            name="isAvailable"
            type="checkbox"
            checked={form.isAvailable}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit">Add Vehicle</button>
      </form>

      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
            {vehicle.year} {vehicle.make} {vehicle.model} - ${vehicle.pricePerDay}/day
            {vehicle.isAvailable ? ' (Available)' : ' (Not Available)'}
            <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageVehicles;
