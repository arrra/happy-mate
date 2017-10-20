import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar">
    <div className="row">
      <div className="six columns">
        <div className="navbar-links"> 
          <ul>
            <li><Link to={'/'}>Happy Mate</Link></li>
          </ul>
        </div>
      </div>
      <div className="six columns">
        <div className="navbar-links">
          <ul>
            <li><Link to={'/login'}>Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
