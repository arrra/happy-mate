import React from 'react';
import SignUpForm from './SignUp';

class SplashPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="eight columns">
              <div className="title">
                <h2>"I love you" emails - automated</h2>
              </div>
              <div className="title-sub">
                <h6>Now you dont have to take out time to send a cute email to your lover! We Automated it!</h6>
              </div>
            </div>
            <div className="one columns">
              <div className="divider">
              </div>
            </div>
            <div className="three columns">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashPage;
