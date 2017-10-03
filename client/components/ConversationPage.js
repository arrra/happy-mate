import React from 'react';
import axios from 'axios';

class ConversationPage extends React.Component {
  render(){
    return(
      <div>
        <h1>{this.props.conversationId}</h1>
      </div>
    )
  }
}

export default ConversationPage;
