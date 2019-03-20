import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';

const styles = theme => ({
    root: {
    },

});

class groupRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            <li key={idx}>{item.username}: {item.content}</li>
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

export default withStyles(styles)(groupRow);
