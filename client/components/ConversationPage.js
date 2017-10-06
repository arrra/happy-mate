import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UserCreateMessageForm from './UserCreateMessageForm';

const baseUrl = 'http://localhost:3000/conversations';

const getConversation = (id) => {
  const getUrl = `${baseUrl}/${id}`;
  return axios.get(getUrl)
    .then(res => res.data);
};

const sendRandomMessage = (conversation) => {
  const putUrl = `${baseUrl}/${conversation._id}/send-random-message-every?interval=86400000`;
  return axios.put(putUrl).then(res => res.data);
};

class ConversationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: null,
    };

    this.handleConversationUpdate = this.handleConversationUpdate.bind(this);
    this.handleSendRandomMessageClick = this.handleSendRandomMessageClick.bind(this);
  }

  componentDidMount() {
    getConversation(this.props.conversationId)
      .then((conversation) => {
        this.setState({ conversation });
      });
  }

  handleConversationUpdate(conversation) {
    this.setState({ conversation });
  }

  handleSendRandomMessageClick() {
    sendRandomMessage(this.state.conversation)
      .then((conversation) => {
        this.setState({ conversation });
      })
      .catch(() => {
        window.alert('Error: Email was not sent');
      });
  }

  render() {
    if (this.state.conversation === null) return null;

    return (
      <div>
        <h1>Email will be sent every 24 hours for now. Will be able to set your own interval later updates</h1>
        <h1>{`From: ${this.state.conversation.from_email}`}</h1>
        <h1>{`To: ${this.state.conversation.to_email}`}</h1>
        <button onClick={this.handleSendRandomMessageClick}>Send Random Message</button>
        {this.state.conversation.sent_messages.map(message => <li>{message.body}</li>)}
        <UserCreateMessageForm
          conversation={this.state.conversation}
          onConversationUpdate={this.handleConversationUpdate}
        />
      </div>
    );
  }
}

ConversationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
};

export default ConversationPage;
