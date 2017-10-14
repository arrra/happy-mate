import React from 'react';
import axios from 'axios';


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
        if (res.data.conversation) {
          this.props.history.push(`/conversations/${res.data.conversation}`);
        } else {
          this.props.history.push('/');
        }
      })
      .catch(res => console.log(res));
  }
  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="title">
          Please Log In with your credentials
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

export default LogIn;
