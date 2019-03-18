import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography } from '@material-ui/core';
import ChatBox from '../Container/chatbox';
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
  drawer: {
    background: '#1b1b1b',
    width: 300,
  },
  text: {
    backgroundColor: 'white',
  },
  chatbox: {
    flexGrow: 1,
    padding: 0,
    margin: '0px 0px 0px 300px',
    height: '75%',
  },
});

class Main extends Component {
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <Typography variant="subheading" style={{ color: '#fafafa' }}>{text}</Typography>
            </ListItem>
          ))}
        </List>
        <Divider style={{ backgroundColor: '#555555' }} />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text} >
              <Typography variant="subheading" style={{ color: '#fafafa' }}>{text}</Typography>
            </ListItem>
          ))}
        </List>

      </div>
    );

    return (
      <div className={classes.root}>
        <Drawer classes={{ paper: classes.drawer }} open={true} variant='permanent'>
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
          </div>
        </Drawer>

        <main className={classes.chatbox}>
          <ChatBox />
        </main>

      </div>
    );
  }
}

export default withStyles(styles)(Main);
