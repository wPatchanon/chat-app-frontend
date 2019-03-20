import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

const chatColor = ['#f4424e', '#ffda56']
const chatText = ['#FFF', '#000']
const styles = theme => ({
    root: {
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    content: {
        maxWidth: 200,
        padding: 10,
    },
    text: {
        margin: 5,
        wordWrap: 'break-word'
    },
    title: {
        fontSize: 14,
        wordWrap: 'break-word'
    },
    chip: {
        margin: 0,
    },
    tri: {
        width: 10,
        height: 20,
        margin: 0,
    },
});

class MessageBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes, message, timeStamp, isOwn, username } = this.props;
        const timeString = new Date(timeStamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        return (
            <div className={classes.root}>
                {isOwn && (<div style={{ margin: 5 }}>{timeString}</div>)
                }
                {!isOwn && (
                    <div>
                        <svg className={classes.tri}>
                            <polygon points="10,0 0,10 10,20 10,0" fill={chatColor[isOwn ? 0 : 1]} />
                        </svg>
                    </div>)
                }
                <div className={classes.content} style={{ backgroundColor: chatColor[isOwn ? 0 : 1] }}>
                    <Typography className={classes.title} align={isOwn ? "right" : "left"} style={{ color: chatText[isOwn ? 0 : 1] }}>
                        <span>
                        {username}
                        </span>
                    </Typography>
                    <Typography className={classes.text} align={isOwn ? "right" : "left"} style={{ color: chatText[isOwn ? 0 : 1] }} variant="h5" component="h2">
                        <span>
                            {message} {this.props.unread ? '(unread)' : null}
                        </span>
                    </Typography>
                </div>
                {!isOwn && (<div style={{ margin: 5 }}>{timeString}</div>)
                }
                {isOwn && (
                    <div>
                        <svg className={classes.tri}>
                            <polygon points="0,0 0,20 10,10 0,0" fill={chatColor[isOwn ? 0 : 1]} />
                        </svg>
                    </div>)
                }
            </div>
        );
    }
}

export default withStyles(styles)(MessageBox);
