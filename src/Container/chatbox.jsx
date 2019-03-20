import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';

const styles = theme => ({
    root: {
    },

});

class chatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            chatHistory: [],
            lastSeen: new Date(),
            unreadFlag: true,
        }
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.updateChatHistory = this.updateChatHistory.bind(this)
    }

    componentDidMount() {
        console.log("did mount")
        this.props.getMessages(
            this.props.username,
            this.props.roomID,
            ({ msg, lastSeen }) => this.setState({
                chatHistory: this.state.chatHistory.concat(msg),
                lastSeen: lastSeen.length ? lastSeen[0] : this.state.lastSeen,
            })
        )
        this.props.registerHandler(this.onMessageReceived)
    }

    componentWillUnmount() {
        const msg = this.state.chatHistory.length ? this.state.chatHistory[this.state.chatHistory.length - 1] : {
            username: this.props.username,
            roomID: this.props.roomID,
            timestamp: new Date()
        }
        console.log("unmount", this.props.username, msg)
        this.props.unregisterHandler(this.props.username, msg);
    }


    handleChange = () => event => {
        this.setState({
            input: event.target.value,
        });
    };

    onMessageReceived(entry) {
        console.log('onMessageReceived:', entry)
        if (entry.roomID === this.props.roomID) this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    render() {
        const { classes } = this.props;
        const message_list = this.state.chatHistory.map((item, idx) => (
            < li key={idx}
                style={{ color: item.timestamp > this.state.lastSeen && this.state.unreadFlag ? 'red' : 'black' }}
            >
                {item.timestamp.toString()} {item.username}: {item.content}
            </li >
        ))
        //if (this.state.chatHistory.length) console.log(typeof (this.state.chatHistory[0].timestamp))
        return (
            <div>
                room: {this.props.roomID}
                , last: {this.state.lastSeen.toString()}
                <div className='messageSection'>
                    <ul>
                        {message_list}
                    </ul>
                </div>

                <div style={{ marginTop: '50%' }}>
                    <form onSubmit={event => {
                        this.props.handleSubmit(this.state.input)(event)
                        this.setState({ input: '', unreadFlag: false })
                    }
                    }
                        autoComplete="off"
                    >

                        <TextField
                            id="message"
                            label="Type Message"
                            className={classes.textField}
                            value={this.state.input}
                            onChange={this.handleChange()}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />

                    </form>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(chatBox);
