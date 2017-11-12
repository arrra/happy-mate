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
import LogIn from './LogIn';
import SplashPage from './SplashPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    };
    this.handleDone = this.handleDone.bind(this);
  }

  handleDone(value) {
    this.setState({
      userName: value,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar userName={this.state.userName} />
          <Route exact path="/" component={SplashPage} />
          <Route
            path="/login"
            render={() => (
              <LogIn onDone={this.handleDone} />
            )}
          />
          <Route exact path="/conversations" component={SendMessageForm} />
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
