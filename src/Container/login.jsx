import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
        };
    }

    handleChange = () => event => {
        this.setState({
            userID: event.target.value,
        });
    };


    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off"
                onSubmit={this.props.handleSubmit(this.state.userID)}
            >
                <TextField
                    id="outlined-name"
                    label="User ID"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange()}
                    margin="normal"
                    variant="outlined"
                />

            </form>
        );
    }
}


export default withStyles(styles)(Login);