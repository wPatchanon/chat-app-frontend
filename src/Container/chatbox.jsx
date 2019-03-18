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
import 'typeface-roboto';

const styles = theme => ({
    root: {
    },
});

class chatBox extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                chatbox

            </div>
        );
    }
}

export default withStyles(styles)(chatBox);
