import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/authenticate';
    return axios.post(url, {
      userName: this.userName.value,
      password: this.password.value },
    { withCredentials: true },
    )
      .then((res) => {
        if (res.status === 200) {
          this.props.onDone(this.userName.value);
          this.props.history.push(`/users/${res.data._id}`);
        }
      })
      .catch(res => console.log(res));
  }
  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="card">
          <h5>Please login here</h5>
          <input
            className="u-full-width"
            ref={(input) => { this.userName = input; }}
            placeholder="User Name"
            type="text"
          />
          <input
            className="u-full-width"
            ref={(input) => { this.password = input; }}
            placeholder="Password"
            type="password"
          />
          <input type="submit" className="button-primary" />
        </div>
      </form>
    );
  }
}

LogIn.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default withRouter(LogIn);
