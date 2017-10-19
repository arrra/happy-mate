import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/conversations';

const updateConversation = (id, update) => {
  const putUrl = `${baseUrl}/${id}`;
  return axios.put(putUrl, update, { withCredentials: true })
    .then(res => res.data);
};

class UserCreateMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const message = {
      body: this.userMessage.value,
    };
    const messagePool = this.props.conversation.messagePool.slice();
    messagePool.push(message);

    const update = {
      messagePool,
    };

    updateConversation(this.props.conversation._id, update)
      .then(this.props.onConversationUpdate);
  }

  render() {
    return (
      <div>
        <input
          className="input"
          ref={(input) => { this.userMessage = input; }}
          placeholder="Enter a message"
        />
        <span>Enter Message</span>
        <button onClick={this.handleClick}>Add Message</button>
        {this.props.conversation.messagePool.map(message => <li>{message.body}</li>)}
      </div>
    );
  }
}

UserCreateMessageForm.propTypes = {
  conversation: PropTypes.object.isRequired,
  onConversationUpdate: PropTypes.func.isRequired,
};

export default UserCreateMessageForm;
