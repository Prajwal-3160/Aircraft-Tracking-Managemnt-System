import React, { useEffect, useState } from 'react';
import api from '../api/api';
import AircraftForm from './AircraftForm';

function AircraftList() {
  const [aircrafts, setAircrafts] = useState([]);

  const fetchData = () => {
   api.get('/aircraft').then(res => {
  console.log(res.data); // Add this line
  setAircrafts(res.data);
});
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <AircraftForm onAircraftAdded={fetchData} />
      <ul className="list-group">
        {aircrafts.map(air => (
          <li key={air.id} className="list-group-item bg-transparent text-white border-light">
  <strong>{air.flightNumber}</strong> - {air.model} - <em>{air.status}</em>
</li>
          
        ))}
      </ul>
    </div>
  );
}

export default AircraftList;
