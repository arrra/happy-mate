import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  render() {
    const userName = this.props.userName || 'Login';
    const link = this.props.userName ? '/conversations' : '/login';

    return (
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
                <li><Link to={link}>{userName}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  userName: PropTypes.string,
};

export default Navbar;
