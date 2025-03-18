import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-backend-url.com/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type='submit'>Login</button>
      </form>
      <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
    </div>
  );
};

export default Login;