import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';
import ConversationPage from './ConversationPage';
import ConfirmationPage from './ConfirmationPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={SendMessageForm} />
          <Route
            path="/conversations/:id"
            render={props => (<ConversationPage
              conversationId={props.match.params.id}
            />)}
          />
          <Route
            path="/confirmation/:id"
            render={props => (<ConfirmationPage
              conversationId={props.match.params.id}
            />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
