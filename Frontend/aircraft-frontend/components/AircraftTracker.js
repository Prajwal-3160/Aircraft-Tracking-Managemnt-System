// src/components/AircraftTracker.js
import React, { useState } from 'react';

function AircraftTracker() {
  const [flightNumber, setFlightNumber] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [aircraftList, setAircraftList] = useState([]);

  const handleAddAircraft = () => {
    if (flightNumber && model && status) {
      const newAircraft = { flightNumber, model, status };
      setAircraftList([...aircraftList, newAircraft]);

      // Clear input fields
      setFlightNumber('');
      setModel('');
      setStatus('');
    }
  };

  return (
    <div className="aircraft-tracker">
      <h2>🛫 Aircraft Tracking System</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleAddAircraft} style={{ backgroundColor: 'green', color: 'white' }}>
          Add
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {aircraftList.map((aircraft, index) => (
          <div
            key={index}
            style={{
              background: '#d46db0',
              padding: '10px',
              margin: '10px auto',
              maxWidth: '600px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            <span style={{ color: '#fff' }}>
              <strong>{aircraft.flightNumber}</strong> - {aircraft.model} - <em>{aircraft.status}</em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AircraftTracker;
