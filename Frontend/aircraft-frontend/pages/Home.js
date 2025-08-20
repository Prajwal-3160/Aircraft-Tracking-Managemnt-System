// Home.js
import React from 'react';
import './Home.css'; // Make sure you import your Home.css file
import AircraftTracker from '../components/AircraftTracker';

const Home = () => {
  return (
    <div className="home-container">
      {/* Your existing home page content, e.g., */}
      <header>
        <marquee><h1>Welcome to Aircraft Tracking & Managment System</h1></marquee>
      </header>
      <main>
      </main>
    </div>
  );
};

export default Home;