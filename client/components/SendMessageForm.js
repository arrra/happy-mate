import React from 'react';
import axios from 'axios';

class SendMessageForm extends React.Component{
  constructor(props){
    super(props)
    this.state = ({
      fromEmail: null,
      toEmail: null,
    })
  }

  handleClick(){
    const fromEmail = this.fromEmailInput.value;
    const toEmail = this.toEmailInput.value;
    this.setState({fromEmail, toEmail});
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post('http://localhost:3000/conversations',{
      from_email: this.fromEmailInput.value,
      to_email: this.toEmailInput.value
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" ref={(input) => { this.fromEmailInput = input; }} type="email" placeholder="Email"/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" ref={(input) => { this.toEmailInput = input; }} type="email" placeholder="Reciepient Email"/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input type="submit"className="button is-success"/>
          </p>
        </div>
      </form>
    )
  }
}

export default SendMessageForm;
