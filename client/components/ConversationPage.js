import React from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/conversations';

const getConversation = (id) => {
  const getUrl = `${baseUrl}/${id}`;
  return axios.get(getUrl)
    .then(res => res.data)
}

class ConversationPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      conversation: null
    }
  }

  componentDidMount(){
    getConversation(this.props.conversationId)
      .then((conversation) => {
        this.setState({conversation: conversation});
      })
  }

  render(){
    if(this.state.conversation === null) return null;

    return(
      <div>
        <h1>{`From: ${this.state.conversation.from_email}`}</h1>
        <h1>{`To: ${this.state.conversation.to_email}`}</h1>
        {this.state.conversation.sent_messages.map((message) => {
          return <li>{message.body}</li>
        })}
      </div>
    )
  }
}

export default ConversationPage;
