import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import queryString from 'query-string';
import Navbar from './Navbar';
import SendMessageForm from './SendMessageForm';
import ConversationPage from './ConversationPage';
import VerificationPage from './VerificationPage';
import SignUp from './SignUp';
import LogIn from './LogIn';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
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
            render={(props) => {
              const parsed = queryString.parse(props.location.search);
              return (
                <VerificationPage
                  conversationId={props.match.params.id}
                  verifyToken={parsed.token}
                />);
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
