import React from 'react';
import { withRouter } from 'react-router';


class UserCreateMessageForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      messages: []
    }
  }

  handleClick(event){
    let userMessages = this.state.messages;
    userMessages.push(this.userMessage.value);
    this.setState({messages: userMessages});

  }

  render() {
    return(
      <div>
        <input
          className="input"
          ref={(input) => { this.userMessage = input; }}
          placeholder="Enter a message"
        />
        <span>Enter Message</span>
        <button onClick={this.handleClick.bind(this)}>Add Message</button>
        {this.state.messages.map(message => <li>{message}</li>)}
      </div>
    )
  }
}

export default UserCreateMessageForm;
