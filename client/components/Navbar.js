import React from 'react';

const Navbar = () => (
  <div>
    <nav className="navbar is-light" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="http://bulma.io">
            Happy-Mate
        </a>
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item is-hidden-desktop-only"
          href="/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p>hi</p>
        </a>
      </div>
    </nav>
  </div>
);

export default Navbar;
