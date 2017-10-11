import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';
import ConversationPage from './ConversationPage';
import VerificationPage from './VerificationPage';
const queryString = require('query-string');


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={SendMessageForm} />
          <Route
            exact
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
              verifyToken={queryString.parse(props.location.search).token}
            />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
