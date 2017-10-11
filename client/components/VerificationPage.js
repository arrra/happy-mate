import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:3000/conversations';
const verifyEmail = (conversationId, verifyToken) => axios.put(`${baseUrl}/${conversationId}/verify?token=${verifyToken}`);

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verified: false };
  }
  componentDidMount() {
    verifyEmail(this.props.conversationId, this.props.verifyToken)
      .then(() => {
        this.setState({ verified: true });
      })
      .catch(() => {
        this.setState({ verified: false });
        window.alert('Token was not match');
      });
  }

  render() {
    if (!this.state.verified) return null;
    return (
      <div>
        <p>Confirming your email...Please wait.</p>
        <Redirect to={{
          pathname: `/conversations/${this.props.conversationId}`,
        }}
        />
      </div>
    );
  }
}

VerificationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
  verifyToken: PropTypes.string.isRequired,
};

export default VerificationPage;
