import React from 'react';
import axios from 'axios';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const url = 'http://localhost:3000/users';
    return axios.post(url, { userName: this.userName.value, password: this.password.value })
      .then(this.props.history.push('/login'))
      .catch(res => res);
  }
  render() {
    return (
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <h5>Please sign up</h5>
        <div className="row">
          <div className="column">
            <input
              className="u-full-width"
              ref={(input) => { this.userName = input; }}
              placeholder="User Name"
            />
            <input
              className="u-full-width"
              type="password"
              ref={(input) => { this.password = input; }}
              placeholder="Password"
            />
            <input type="submit" className="button-primary" />
          </div>
        </div>
      </form>

    );
  }
}

export default SignUp;
