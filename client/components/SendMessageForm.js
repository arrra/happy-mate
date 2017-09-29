import React from 'react';
import axios from 'axios';

const url ='http://localhost:3000/conversations'

class SendMessageForm extends React.Component{
  sendRandomMessage(conversationId){
    return axios.post(`${url}/${conversationId}/messages/send`);
  }

  getRandomMessage(conversationId){
    return axios.put(`${url}/${conversationId}/messages`);
  }

  createConversation(){
    return axios.post(url,{
      from_email: this.fromEmailInput.value,
      to_email: this.toEmailInput.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.createConversation().then((conversation) => {
      this.getRandomMessage(conversation.data._id).then((updatedConversation) => {
        this.sendRandomMessage(updatedConversation.data._id).then((message) => {
        })
      })
    });
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
