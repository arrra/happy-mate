import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';
import ConversationPage from './ConversationPage';
import ConfirmationPage from './ConfirmationPage';
import VerificationPage from './VerificationPage';

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
            exact
            path="/conversations/:id/verify"
            render={props => (<VerificationPage
              conversationId={props.match.params.id}
            />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
