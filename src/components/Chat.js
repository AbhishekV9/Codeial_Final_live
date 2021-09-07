import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // this is the array of objects whose objects looks like----- {content: 'some message', self: true}
      typedMessage: '',
    };

    this.socket = io.connect('http://codeial.codingninjas.com:5000/'); //connecting socket to the server ----akash's sir chat server
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () { //by using method 'on' we can define actions like here our defined action is connect and when the socket connection is finished sucessfully then this callback will be runned once.
      console.log('CONNECTION ESTABLISHED');
      socketConnection.emit('join_room', { //using emit we can send any action to the server here we are sending action to join room
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) { //listening for user joined action and whenever a user joins the room we will get data in our callback
        console.log('NE USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) { //listener for receive message and then pushing that data into messages array
      // add message to state
      const { messages } = self.state;
      const messageObject = {}; 
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://image.flaticon.com/icons/png/512/1828/1828906.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                messages.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
