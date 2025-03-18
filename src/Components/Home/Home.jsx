import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <nav className='navbar'>
        <h2>BlogPost</h2>
        <div>
          <Link to='/login' className='nav-link'>Login</Link>
          <Link to='/signup' className='nav-link'>Sign Up</Link>
        </div>
      </nav>

      <div className='hero-section'>
        <h1>Welcome to BlogPost</h1>
        <p>Share your thoughts with the world!</p>
        <Link to='/signup' className='cta-button'>Get Started</Link>
      </div>
    </div>
  );
};

export default Home;