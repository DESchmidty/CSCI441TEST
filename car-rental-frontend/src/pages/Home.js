import React, { useEffect, useState } from 'react';
import API from '../api';

function Home() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    API.get('/vehicles').then(res => setVehicles(res.data));
  }, []);

  return (
    <div>
      <h1>Available Vehicles</h1>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
            {vehicle.year} {vehicle.make} {vehicle.model} - ${vehicle.pricePerDay}/day
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
