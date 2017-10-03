import React from 'react';
import axios from 'axios';

const url ='http://localhost:3000/conversations'

const getOrCreateConversation = (params) => {
  const getUrl = `${url}?from_email=${params.from_email}&to_email=${params.to_email}`;
  return axios.get(getUrl).then(res => {
    return res.data;


  }).catch(() => {
    return axios.post(url,params).then(res => {
      return res.data;
    });

  })
}

const sendRandomMessage = (conversation) => {
  const putUrl = `${url}/${conversation._id}/messages`;
  return axios.put(putUrl).then(res => {
    return res.data;
  })
}

class SendMessageForm extends React.Component{


  handleSubmit(event){
    event.preventDefault();
    const params = {
      from_email: this.fromEmailInput.value,
      to_email: this.toEmailInput.value
    };
    getOrCreateConversation(params).then(conversation => {
      sendRandomMessage(conversation).then(conversation => {
        console.log('--sendRandomMessage--',conversation);
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
