import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div>
    <nav className="navbar is-light" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
            Happy-Mate
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to={'/signup'}>Sign up </Link>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
