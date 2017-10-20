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
  // <!-- <div> -->
  // <!--   <nav className="navbar is&#45;light" aria&#45;label="main navigation"> -->
  // <!--     <div className="navbar&#45;brand"> -->
  // <!--       <a className="navbar&#45;item" href="/"> -->
  // <!--           Happy&#45;Mate -->
  // <!--       </a> -->
  // <!--     </div> -->
  // <!--     <div className="navbar&#45;menu"> -->
  // <!--       <div className="navbar&#45;end"> -->
  // <!--         <div className="navbar&#45;item"> -->
  // <!--           <Link to={'/signup'}>Sign up </Link> -->
  // <!--         </div> -->
  // <!--         <div className="navbar&#45;item"> -->
  // <!--           <Link to={'/login'}>Log In</Link> -->
  // <!--         </div> -->
  // <!--       </div> -->
  // <!--     </div> -->
  // <!--   </nav> -->
  // <!-- </div> -->
