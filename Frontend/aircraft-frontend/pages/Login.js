import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic hardcoded login
    const username = e.target.username.value;
    const password = e.target.password.value;
    // --- CHANGE THESE VALUES ---
    if (username === 'Air India' && password === 'Air@123') {
      navigate('/home');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Air India</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;