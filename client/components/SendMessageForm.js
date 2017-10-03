import React from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/conversations';

const getOrCreateConversation = (params) => {
  const getUrl = `${url}?from_email=${params.from_email}&to_email=${params.to_email}`;
  return axios.get(getUrl)
    .then(res => res.data)
    .catch(() => axios.post(url, params).then(res => res.data));
};

const sendRandomMessage = (conversation) => {
  const putUrl = `${url}/${conversation._id}/messages`;
  return axios.put(putUrl).then(res => res.data);
};

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      from_email: this.fromEmailInput.value,
      to_email: this.toEmailInput.value,
    };
    getOrCreateConversation(params)
      .then(conversation => sendRandomMessage(conversation)
        .then(() => {
          // TODO: notify user message sent
          window.alert('Email sent');
        }),
      )
      .catch(() => {
        window.alert('Error: Email not sent');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              ref={(input) => { this.fromEmailInput = input; }}
              type="email"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              ref={(input) => { this.toEmailInput = input; }}
              type="email"
              placeholder="Reciepient Email"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input type="submit"className="button is-success" />
          </p>
        </div>
      </form>
    );
  }
}

export default SendMessageForm;
