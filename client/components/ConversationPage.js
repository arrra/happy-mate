import React from 'react';
import axios from 'axios';

const ConversationPage = (props) => {
  return(
    <div>
      <h1>{props.match.params.id}</h1>
    </div>
  )
}

export default ConversationPage;
