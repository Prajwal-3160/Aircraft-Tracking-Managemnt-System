import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboardPage() {
  const [formData, setFormData] = useState({
    id: '',
    totalUsers: '',
    totalBookings: '',
    activeFlights: '',
    adminNote: '',
  });

  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/dashboard/all');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8083/api/dashboard/save', formData);
      setFormData({ id: '', totalUsers: '', totalBookings: '', activeFlights: '', adminNote: '' });
      fetchData();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setFormData(data);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter ID (for update)"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Users:</label>
          <input
            type="number"
            name="totalUsers"
            value={formData.totalUsers}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Bookings:</label>
          <input
            type="number"
            name="totalBookings"
            value={formData.totalBookings}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Active Flights:</label>
          <input
            type="number"
            name="activeFlights"
            value={formData.activeFlights}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Admin Note:</label>
          <input
            type="text"
            name="adminNote"
            value={formData.adminNote}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Updating...' : 'Update Dashboard'}
        </button>
      </form>

      <hr />

      <h4>Dashboard Records</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Users</th>
            <th>Total Bookings</th>
            <th>Active Flights</th>
            <th>Admin Note</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.totalUsers}</td>
              <td>{data.totalBookings}</td>
              <td>{data.activeFlights}</td>
              <td>{data.adminNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboardPage;
