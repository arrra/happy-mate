import React from 'react';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';

class App extends React.Component{
  render() {
    return (
      <div>
        <Navbar />
        <SendMessageForm />
      </div>
    )
  }
}

export default App;
