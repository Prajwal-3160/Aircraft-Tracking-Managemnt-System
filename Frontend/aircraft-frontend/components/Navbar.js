import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>✈ Aircraft Tracking & Management System</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pilots">Pilots</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/about">About</Link>
         <Link to="/book-flight">Book Flight</Link>
         <Link to="/admin-dashboard">Admin</Link>
         <Link to="/contact">Contact</Link>
         <Link to="/weather">Weather</Link>

      </div>
    </nav>
  );
}

export default Navbar;
