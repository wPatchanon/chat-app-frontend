import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';
import MessageBox from './messageBox'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'block'
    },
    chatbox: {
        width: '100%',
        overflowY: 'scroll',
    },
    textBox: {
        width: '100%',
        position: "fixed",
        bottom: 0,
        margin: 5,
    }
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
        this.onMessageReceived = this.onMessageReceived.bind(this)
        this.updateChatHistory = this.updateChatHistory.bind(this)
        //this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
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

    componentWillUpdate() {

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
            <Grid key={idx} container justify={item.username == this.props.userName ? 'flex-end' : 'flex-start'}>
                <MessageBox
                    userName={item.username}
                    timeStamp={item.timestamp}
                    message={item.content}
                    isOwn={item.username == this.props.userName} />
            </Grid>
        ))
        //if (this.state.chatHistory.length) console.log(typeof (this.state.chatHistory[0].timestamp))
        return (
            <Grid container>
                <Grid item className={classes.chatbox}>
                    {message_list}
                </Grid>

                <Grid item className={classes.textBox}>
                    <form onSubmit={event => {
                        this.props.handleSubmit(this.state.input)(event)
                        this.setState({ input: '', unreadFlag: false })
                    }
                    }
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
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(chatBox);
