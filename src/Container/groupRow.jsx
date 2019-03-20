import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';

const styles = theme => ({
    root: {
    },
    drawer: {
        background: '#1b1b1b',
        width: 300,
    },
    listItem: {
        color: 'rebeccapurple'
    },
    textField: {
        color: '#FFF'
    },
    cssLabel: {
        '&$cssFocused': {
            color: 'white !important',
        },
        color: 'white !important',
    },
    cssFocused: {
        color: '#FFF'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'white !important',
        }
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'green !important'
    },
});

class groupRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            roomsAll: [],
        }
        this.onMessageReceived = this.onMessageReceived.bind(this)
    }

    componentDidMount() {
        console.log("GroupRow did mount")
        this.props.updateGroup(this.onMessageReceived)
    }


    handleChange = () => event => {
        this.setState({
            input: event.target.value,
        });
    };

    handleClick = async event => {
        await this.props.newGroup(this.state.input)
        //this.setState({ roomsAll: this.state.roomsAll.concat(this.state.input) })
        await this.props.handleJoinGroup(this.state.input)(event)
        this.setState({ input: '' })
    }

    onMessageReceived(entry) {
        console.log('onGroupReceived:', entry)
        this.setState({ roomsAll: this.state.roomsAll.concat(entry) })
    }



    render() {
        const { classes } = this.props;
        const roomsAvailable = this.state.roomsAll.filter(item => !this.props.roomsJoined.includes(item))
        const sideList = (
            <div className={classes.list}>
                <List>
                    {this.props.roomsJoined.map((text, index) => (
                        <ListItem
                            button key={text}
                            onClick={this.props.handleChangeGroup(text)}
                            style={{ backgroundColor: (text === this.props.roomID) ? '#424242' : '#1b1b1b' }}
                        >
                            <Typography variant="subheading" style={{ color: '#1de9b6' }}>{text}</Typography>
                            {/* <Button color="secondary" onClick={() => alert(this.props.roomID)}>Leave</Button> */}
                        </ListItem>
                    ))}
                </List>
                <Divider style={{ backgroundColor: '#1de9b6' }} />
                <List>
                    {roomsAvailable.map((text, index) => (
                        <ListItem button key={text} onClick={
                            this.props.handleJoinGroup(text)
                        } >
                            <Typography variant="subheading" style={{ color: '#fafafa' }}>{text}</Typography>
                        </ListItem>
                    ))}
                </List>

            </div>
        );

        return (
            <div>
                <Drawer classes={{ paper: classes.drawer }} open={true} variant='permanent'>
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        <TextField
                            id="New group"
                            label="Type Group Name"
                            className={classes.textField}
                            value={this.state.input}
                            onChange={this.handleChange()}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        />
                        <Button color="secondary" onClick={this.handleClick}>Create</Button>
                        {sideList}
                    </div>

                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(groupRow);
