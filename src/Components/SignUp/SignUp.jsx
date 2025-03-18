import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url.com/signup', { username, password });
      navigate('/login');
    } catch (error) {
      setError('Signup failed, please try again.');
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h2>Sign Up</h2>
        {error && <p className='error-message'>{error}</p>}
        <form onSubmit={handleSignUp}>
          <input type='text' placeholder='Username' className='signup-input' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type='password' placeholder='Password' className='signup-input' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type='submit' className='signup-button'>Sign Up</button>
        </form>
        <p className='signup-links'>Already have an account? <a href='/login'>Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;