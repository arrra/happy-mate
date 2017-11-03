import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UserCreateMessageForm from './UserCreateMessageForm';

const baseUrl = 'http://localhost:3000/conversations';

const getConversation = (id) => {
  const getUrl = `${baseUrl}/${id}`;
  return axios.get(getUrl, { withCredentials: true })
    .then(res => res.data);
};

const sendRandomMessage = (conversation) => {
  const dayInterval = 86400000;
  const putUrl = `${baseUrl}/${conversation._id}/send-random-message-every?interval=${dayInterval}`;
  return axios.put(putUrl, null, { withCredentials: true }).then(res => res.data);
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
    if (!this.state.conversation.isVerified) {
      window.alert('your email is not verified');
      return null;
    }
    return (
      <div className="container">
        {this.state.conversation.sent_messages.map(message => <li>{message.body}</li>)}
        <UserCreateMessageForm
          conversation={this.state.conversation}
          onConversationUpdate={this.handleConversationUpdate}
        />
        <div className="conversation-submit-btn">
          <button className="button-primary" onClick={this.handleSendRandomMessageClick}>Send Random Message</button>
        </div>
      </div>
    );
  }
}

ConversationPage.propTypes = {
  conversationId: PropTypes.string.isRequired,
};

export default ConversationPage;
