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
      <div className="message-input">
        <h5>Enter A Message</h5>
        <div className="row">
          <div className="nine columns">
            <input
              className="u-full-width"
              ref={(input) => { this.userMessage = input; }}
              placeholder="Message"
              type="text"
            />
          </div>
          <div className="three columns">
            <button onClick={this.handleClick}>Add Message</button>
          </div>
        </div>
        {this.props.conversation.messagePool.map(message => <div className="row message-body">{message.body}</div>)}
      </div>
    );
  }
}

UserCreateMessageForm.propTypes = {
  conversation: PropTypes.object.isRequired,
  onConversationUpdate: PropTypes.func.isRequired,
};

export default UserCreateMessageForm;
