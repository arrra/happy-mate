import React from 'react';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';
import ConversationPage from './ConversationPage';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/" component={SendMessageForm}/>
          <Route path="/conversations/:id" render={(props)=> {
            return <ConversationPage 
              conversationId={props.match.params.id}
            />
          }}/>
      </div>
    </Router>
    );
  }
}

export default App;
