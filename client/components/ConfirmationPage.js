import React from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

const baseUrl = 'http://localhost:3000/confirmation';

const verifyEmail = (conversationId) => {
  const getUrl = `${baseUrl}/${conversationId}`
  return axios.get(getUrl).then(res => res);
};

class ConfirmationPage extends React.Component {
  constructor(props){
    super(props)
    this.state = { verified : false }
  }
  componentDidMount() {
    verifyEmail(this.props.conversationId)
      .then((res) => {
        if(res.status === 200){
          this.setState({verified: true})
        }
      });
  }

  render() {
    if(this.state.verified === false) return null;
    return (
      <div>
        <p>Confirming your email...Please wait.</p>
        <Redirect to={{
          pathname: `/conversations/${this.props.conversationId}`,
        }}/>
    </div>
    );
  }
}

export default ConfirmationPage;
