import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Ticket not available</h2>
        <p>No booking data was passed. Please book a flight first.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30, fontFamily: 'Segoe UI, sans-serif', background: '#f0f4fb', minHeight: '100vh' }}>
      <div style={{
        maxWidth: 800, margin: '0 auto', background: '#fff',
        padding: 25, borderRadius: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginTop: 0, textAlign: 'center' }}>Flight Ticket</h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div><strong>Booking ID:</strong> {booking.id || booking.bookingId}</div>
          <div><strong>Status:</strong> {booking.status || 'Confirmed'}</div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <InfoBlock label="Passenger" value={booking.passenger_name || booking.passengerName || booking.email} />
          <InfoBlock label="Flight No." value={booking.flight_number || booking.flightNumber} />
          <InfoBlock label="Date" value={booking.departure_date || booking.departureDate} />
          <InfoBlock label="Seat" value={booking.seat_number || booking.seatNumber} />
          <InfoBlock label="Class" value={booking.seat_class || booking.seatClass} />
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 20 }}>
          <InfoBlock label="From" value={booking.source} />
          <InfoBlock label="To" value={booking.destination} />
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 20 }}>
          <InfoBlock label="Email" value={booking.email} />
          <InfoBlock label="Phone" value={booking.phone} />
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <small>This is an electronic ticket. For changes contact support.</small>
        </div>
        <div style={{ marginTop: 10, background: '#ffecec', padding: 10, borderRadius: 6 }}>
          <strong>Note:</strong> Printing is disabled for this ticket.
        </div>
      </div>

      <style>{`
        @media print {
          body { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const InfoBlock = ({ label, value }) => (
  <div style={{
    flex: '1 1 160px',
    background: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    minWidth: 140
  }}>
    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: 4, color: '#555' }}>
      {label}
    </div>
    <div>{value || '-'}</div>
  </div>
);

export default TicketPage;
