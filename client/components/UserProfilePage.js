import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const baseUrl = 'http://localhost:3000/conversations';
class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: null,
    };
  }
  componentDidMount() {
    return axios.get(`${baseUrl}/?owner=${this.props.userId}`, { withCredentials: true })
      .then(res => this.setState({ conversations: res.data }))
      .catch(() => this.props.history.push('/conversations'));
  }
  render() {
    if (this.state.conversations === null) return null;
    return (
      <div className="profile-page">
        <div className="container">
          <div className="main-title">
            Inbox
          </div>
          <div className="conversation-list">
            <div className="conversation-unit">
              <div className="conversation-unit-link">
                {this.state.conversations.map(conversation =>
                  (<Link to={`/conversations/${conversation.id}`}>
                    <li>{conversation.to_email}
                    </li>
                  </Link>),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  userId: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default withRouter(UserProfilePage);
