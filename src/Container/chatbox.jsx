import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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
            <li key={idx}>{item.userId}: {item.content}</li>
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
