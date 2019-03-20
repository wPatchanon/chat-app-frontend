<<<<<<< HEAD
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
        }
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.updateChatHistory = this.updateChatHistory.bind(this)
    }

    componentDidMount() {
        console.log("did mount")
        this.props.registerHandler(this.onMessageReceived)
    }

    handleChange = () => event => {
        this.setState({
            input: event.target.value,
        });
    };

    onMessageReceived(entry) {
        console.log('onMessageReceived:', entry)
        this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    render() {
        const { classes } = this.props;
        const message_list = this.state.chatHistory.map((item, idx) => (
            <li key={idx}>{item.timestamp} {item.username}: {item.content}</li>
        ))

        return (
            <div>
                <div className='messageSection'>
                    <ul>
                        {message_list}
                    </ul>
                </div>

                <div style={{ marginTop: '50%' }}>
                    <form onSubmit={event => {
                        this.props.handleSubmit(this.state.input)(event)
                        this.setState({ input: '' })
                    }
                    }>

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
=======
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';
import MessageBox from './messageBox'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display:'block'
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
        }
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.updateChatHistory = this.updateChatHistory.bind(this)
    }

    componentDidMount() {
        console.log("did mount")
        this.props.registerHandler(this.onMessageReceived)
    }

    handleChange = () => event => {
        this.setState({
            input: event.target.value,
        });
    };

    onMessageReceived(entry) {
        console.log('onMessageReceived:', entry)
        this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    render() {
        const { classes } = this.props;
        const message_list = this.state.chatHistory.map((item, idx) => (
            <Grid key={idx} container justify={item.username == this.props.userName ? 'flex-end':'flex-start'}>
                <MessageBox 
                    userName={item.username} 
                    timeStamp={item.timestamp} 
                    message={item.content} 
                    isOwn={item.username == this.props.userName} />
            </Grid>
        ))

        return (
            <Grid container>
                <Grid item className={classes.chatbox}>
                    {message_list}
                </Grid>

                <Grid item className={classes.textBox}>
                    <form onSubmit={event => {
                        this.props.handleSubmit(this.state.input)(event)
                        this.setState({ input: '' })
                    }
                    }>
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
>>>>>>> 43478208b749b3c9568ad222cca65ec436700511
