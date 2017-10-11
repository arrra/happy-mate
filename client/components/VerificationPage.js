import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const queryString = require('query-string');
import { withRouter } from 'react-router';
import {
  Redirect,
} from 'react-router-dom';

const baseUrl = 'http://localhost:3000/conversations';

const verifyEmail = (conversationId, putUrl) => {
  return axios.put(putUrl).then(res => res);
};

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verified: false };
  }
  componentDidMount() {
  const parsed = queryString.parse(this.props.location.search);
  const putUrl = `${baseUrl}/${this.props.conversationId}/verify?token=${parsed.token}`;
    verifyEmail(this.props.conversationId, putUrl)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ verified: true });
        }
      });
  }

  render() {
    if (this.state.verified === false) return null;
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
};

export default withRouter(VerificationPage);
