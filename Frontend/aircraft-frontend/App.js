import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Pilots from './components/Pilots';
import BookFlightForm from './components/BookFlightForm';
import AircraftTracker from './components/AircraftTracker';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ContactPage from './pages/ContactPage';
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';


const AppLayout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar on Login Page
  const hideNavbar = location.pathname === '/';
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
          <Route path="/pilots" element={<Pilots />} />
          <Route path="/book-flight" element={<BookFlightForm />} />
          <Route path="/track" element={<AircraftTracker />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/weather" element={<Weather />} />

        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
