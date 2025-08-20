import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookFlightForm = () => {
  const [formData, setFormData] = useState({
    passenger_name: '',
    flight_number: '',
    departure_date: '',
    seat_number: '',
    source: '',
    destination: '',
    email: '',
    phone: '',
    seat_class: ''
  });

  const [message, setMessage] = useState(''); // success or error
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // redirect

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8083/api/bookings", formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      // assume successful if status 2xx and has booking id
      const booking = response.data;
      if (booking && (booking.id || booking.bookingId)) {
        setMessage("✅ Flight Booked Successfully");
        // optionally clear form
        setFormData({
          passenger_name: '',
          flight_number: '',
          departure_date: '',
          seat_number: '',
          source: '',
          destination: '',
          email: '',
          phone: '',
          seat_class: ''
        });
        // after short delay navigate to ticket page with booking
        setTimeout(() => {
          navigate("/ticket", { state: { booking } });
        }, 1000); // 1 second delay so user sees message
      } else {
        setIsError(true);
        setMessage("❌ Booking succeeded but response was unexpected.");
        console.warn("Unexpected booking response:", response.data);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("❌ Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-3">✈️ Book Your Flight</h3>
        <form onSubmit={handleSubmit}>
          <label>Passenger Name</label>
          <input
            type="text"
            className="form-control"
            name="passenger_name"
            value={formData.passenger_name}
            onChange={handleChange}
            required
          />

          <label>Flight Number</label>
          <input
            name="flight_number"
            value={formData.flight_number}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Departure Date</label>
          <input
            type="date"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Seat Number</label>
          <input
            name="seat_number"
            value={formData.seat_number}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Source</label>
          <input
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Destination</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <label>Seat Class</label>
          <select
            name="seat_class"
            value={formData.seat_class}
            onChange={handleChange}
            className="form-control mb-3"
            required
          >
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Booking...' : 'Book Flight'}
          </button>
        </form>

        {message && (
          <p
            className="mt-3"
            style={{
              color: isError ? '#c0392b' : '#1e7e34',
              fontWeight: '600'
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookFlightForm;
