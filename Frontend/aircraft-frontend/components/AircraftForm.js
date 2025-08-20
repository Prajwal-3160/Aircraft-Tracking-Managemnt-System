import React, { useState } from 'react';
import api from '../api/api';

function AircraftForm({ onAircraftAdded }) {
  const [formData, setFormData] = useState({
    flightNumber: '',
    model: '',
    status: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/aircraft', formData).then(() => {
      onAircraftAdded();
      setFormData({ flightNumber: '', model: '', status: '' });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-4">
        <input className="form-control" type="text" name="flightNumber" value={formData.flightNumber}
               onChange={handleChange} placeholder="Flight Number" required />
      </div>
      <div className="col-md-4">
        <input className="form-control" type="text" name="model" value={formData.model}
               onChange={handleChange} placeholder="Model" required />
      </div>
      <div className="col-md-3">
        <input className="form-control" type="text" name="status" value={formData.status}
               onChange={handleChange} placeholder="Status" required />
      </div>
      <div className="col-md-1">
        <button className="btn btn-success w-100" type="submit">Add</button>
      </div>
    </form>
  );
}

export default AircraftForm;
