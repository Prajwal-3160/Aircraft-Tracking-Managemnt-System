import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Pilots = () => {
  const [pilots, setPilots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPilot, setNewPilot] = useState({
    name: "",
    experience: "",
    licenseNumber: "",
  });

  const fetchPilots = () => {
    fetch("http://localhost:8083/api/pilots")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.slice().sort((a, b) => (a.id && b.id ? b.id - a.id : 0));
        setPilots(sorted);
      })
      .catch((err) => console.error("Failed to fetch pilots:", err));
  };

  useEffect(() => {
    fetchPilots();
  }, []);

  const handleInputChange = (e) => {
    setNewPilot({ ...newPilot, [e.target.name]: e.target.value });
  };

  const handleAddPilot = () => {
    if (!newPilot.name || !newPilot.experience || !newPilot.licenseNumber) {
      alert("Please fill all fields.");
      return;
    }

    fetch("http://localhost:8083/api/pilots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPilot),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server error when adding pilot");
        return res.json();
      })
      .then((addedPilot) => {
        setNewPilot({ name: "", experience: "", licenseNumber: "" });
        setPilots((prev) => [addedPilot, ...prev]);
      })
      .catch((err) => console.error("Error adding pilot:", err));
  };

  // 🔍 Filter pilots based on search query (name, experience, or license number)
  const filteredPilots = pilots.filter((pilot) =>
    pilot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pilot.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pilot.experience.toString().includes(searchQuery)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "1.5rem", color: "#1e40af" }}>
        👨‍✈️ <strong>Pilot Details</strong>
      </h2>

      {/* 🔍 Search Box */}
      <div style={{ maxWidth: "500px", margin: "auto", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search by name, license number or experience..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* ➕ Add Pilot Form */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "2rem", flexWrap: "wrap" }}>
        <input
          type="text"
          name="name"
          placeholder="Pilot Name"
          value={newPilot.name}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "200px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={newPilot.experience}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "150px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={newPilot.licenseNumber}
          onChange={handleInputChange}
          style={{ padding: "8px", width: "180px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAddPilot}
          style={{
            backgroundColor: "#0d3791ff",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Add Pilot
        </button>
      </div>

      {/* 📋 Pilot Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {filteredPilots.length > 0 ? (
          filteredPilots.map((pilot) => (
            <motion.div
              key={pilot.id || `${pilot.name}-${Math.random()}`}
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: "#cf902bff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 6px 12px rgba(41, 128, 141, 0.15)",
                textAlign: "center",
                border: "2px solid transparent",
                transition: "0.4s",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#740bd6ff" }}>✈️ {pilot.name}</h3>
              <p style={{ margin: "8px 0", fontSize: "1rem" }}>
                🎖 <strong>Experience:</strong> {pilot.experience}
              </p>
              <p style={{ margin: "8px 0", fontSize: "1rem", color: "#b51230ff" }}>
                🆔 <strong>License:</strong> {pilot.licenseNumber}
              </p>
            </motion.div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888", fontSize: "18px", gridColumn: "1 / -1" }}>
            No pilots found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pilots;
