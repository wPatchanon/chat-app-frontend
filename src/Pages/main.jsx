import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatBox from '../Container/chatbox';
import Login from '../Container/login';
import socket from '../socket';
import GroupRow from '../Container/groupRow'
import 'typeface-roboto';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  text: {
    backgroundColor: 'white',
  },
  chatbox: {
    flexGrow: 1,
    padding: 0,
    margin: 'auto auto auto 320px',
    height: '100%',
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      client: socket(),
      isRegisterInProcess: false,
      inputBox: '',
      roomID: 'Default',
      roomsJoined: [],
    }
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSendMsg = this.handleSendMsg.bind(this);
    this.register = this.register.bind(this)
    this.message = this.message.bind(this)
  }

  componentDidMount() {
    this.state.client.userRequestHandler(() => this.state.client.sendUser(this.state.username))
  }

  handleSubmitLogin = uid => event => {
    event.preventDefault();
    this.setState({ username: uid });
    this.register(uid);
  }

  handleSendMsg = msg => event => {
    event.preventDefault();
    //console.log(msg)
    this.setState({ inputBox: msg });
    this.message(this.state.roomID, {
      username: this.state.username,
      roomID: this.state.roomID,
      content: msg,
      timestamp: new Date()
    });
  }

  handleChangeGroup = room => event => {
    event.preventDefault();
    this.setState({ roomID: room });
  }

  handleJoinGroup = room => event => {
    event.preventDefault();
    this.state.client.join(this.state.username, room, () => {
      return this.message(room, {
        username: this.state.username,
        roomID: room,
        content: '*#Join',
        timestamp: new Date()
      }, () => this.setState({ roomID: room, roomsJoined: this.state.roomsJoined.concat(room) }))
    });
  }

  handleLeaveGroup = room => event => {
    console.log('leave')
    event.preventDefault();
    this.state.client.leave(this.state.username, this.state.roomID, () => {
      return this.message(room, {
        username: this.state.username,
        roomID: room,
        content: '*#Leave',
        timestamp: new Date()
      }, () => this.setState({
        roomID: 'Default',
        roomsJoined: this.state.roomsJoined.filter(item => item !== room)
      }))
    });
  }

  register(name) {
    const onRegisterResponse = user => this.setState({ isRegisterInProcess: false, user })
    this.setState({ isRegisterInProcess: true })
    this.state.client.register(name, (err, user) => {
      if (err) return onRegisterResponse(null)
      return onRegisterResponse(user)
    })
  }

  message(chatroomName, msg, cb) {
    this.state.client.message(chatroomName, msg, cb)
  }


  render() {
    const { classes } = this.props;

    return (
      (this.state.username === '') ? <Login handleSubmit={this.handleSubmitLogin} /> :
        <div className={classes.root}>

          <GroupRow handleChangeGroup={this.handleChangeGroup}
            handleJoinGroup={this.handleJoinGroup}
            roomsJoined={this.state.roomsJoined}
            updateGroup={this.state.client.updateGroup}
            newGroup={this.state.client.newGroup}
            roomID={this.state.roomID}
          />

          <main className={classes.chatbox}>
            <h1>User: {this.state.username}</h1>
            <div>
              {this.state.roomID !== 'Default' ?
                <ChatBox
                  key={this.state.roomID}
                  handleSubmit={this.handleSendMsg}
                  handleLeaveGroup={this.handleLeaveGroup}
                  registerHandler={this.state.client.registerHandler}
                  unregisterHandler={this.state.client.unregisterHandler}
                  roomID={this.state.roomID}
                  username={this.state.username}
                  getMessages={this.state.client.getMessages}
                /> : <h1>select group</h1>
              }
            </div>
          </main>



        </div>
    );
  }
}

export default withStyles(styles)(Main);
