import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:3000/conversations';
const verifyEmail = (conversationId, verifyToken) => axios.put(`${baseUrl}/${conversationId}/verify?token=${verifyToken}`)

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verified: false };
  }
  componentDidMount() {
    const putUrl = `${baseUrl}/${this.props.conversationId}/verify?token=${this.props.verifyToken}`;
    verifyEmail(this.props.conversationId, putUrl)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ verified: true });
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ verified: false });
          window.alert('Token was not match');
        }
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

export default withRouter(VerificationPage);
