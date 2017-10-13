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
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="title">
          Please sign up
        </div>
        <div className="field">
          <input
            className="input"
            ref={(input) => { this.userName = input; }}
            placeholder="User Name"
          />
        </div>
        <div className="field">
          <input
            className="input"
            ref={(input) => { this.password = input; }}
            placeholder="Password"
          />
        </div>
        <div className="field">
          <p className="control">
            <input type="submit"className="button is-success" />
          </p>
        </div>
      </form>

    );
  }
}

export default SignUp;
