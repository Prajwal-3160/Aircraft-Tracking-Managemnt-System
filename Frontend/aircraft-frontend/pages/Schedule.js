import React, { useEffect, useState } from "react";
import "./Schedule.css";

const Schedule = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [newAircraft, setNewAircraft] = useState({
    flightNumber: "",
    model: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAircrafts = () => {
    fetch("http://localhost:8083/api/aircrafts")
      .then((res) => res.json())
      .then((data) => setAircrafts(data))
      .catch((err) => console.error("Failed to fetch aircrafts:", err));
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const handleInputChange = (e) => {
    setNewAircraft({ ...newAircraft, [e.target.name]: e.target.value });
  };

  const handleAddAircraft = () => {
    fetch("http://localhost:8083/api/aircrafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAircraft),
    })
      .then((res) => res.json())
      .then((addedAircraft) => {
        setAircrafts((prev) => [addedAircraft, ...prev]);
        setNewAircraft({ flightNumber: "", model: "", status: "" });
      })
      .catch((err) => console.error("Error adding aircraft:", err));
  };

  const filteredAircrafts = aircrafts.filter(
    (aircraft) =>
      aircraft.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>📅 Flight Schedule</h2>
      </div>

      {/* Add New Flight Form */}
      <div className="add-flight-form">
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={newAircraft.flightNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Aircraft Model"
          value={newAircraft.model}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newAircraft.status}
          onChange={handleInputChange}
        />
        <button onClick={handleAddAircraft}>➕ Add Flight</button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Flight, Model or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Modern Table */}
      <div className="table-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Model</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAircrafts.map((aircraft, index) => (
              <tr key={index}>
                <td>{aircraft.flightNumber}</td>
                <td>{aircraft.model}</td>
                <td>{aircraft.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
