import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

// const styles = theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//     },
//     dense: {
//         marginTop: 16,
//     },
//     menu: {
//         width: 200,
//     },

const styles = theme => ({
    avatar: {
        margin: 10,
        width: 80,
        height: 80
    },
    container: {
        display: "flex",
        flexWrap: "wrapF"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
        fontSize: 17
    },
    button: {
        margin: theme.spacing.unit
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

var bgColors = {
    Green: "#c3c3c3"
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: ""
        };
    }

    handleChange = () => event => {
        this.setState({
            userID: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <form
                className={classes.container}
                noValidate
                autoComplete="off"
                style={{ display: "inline" }}
                onSubmit={this.props.handleSubmit(this.state.userID)}
            >
                <Grid container justify="center" alignItems="center">
                    <img src={"./logo.png"} alt="fireSpot" />
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Typography variant="h5" component="h3">
                        Enter Your Name
          </Typography>
                </Grid>
                <br />
                <Grid container justify="center" alignItems="center">
                    <TextField
                        id="outlined-name"
                        label="User ID"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange()}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Typography variant="h6" component="h6">
                        (Press Enter To Continue)
          </Typography>
                </Grid>
            </form>
        );
    }
}

export default withStyles(styles)(Login);
