import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { validateEmail } from "../../utils/validators";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://hipbar.com/">
        Hip Bar Pvt. Ltd. ©
      </Link>{" "}
      {new Date().getFullYear()}
      {" All rights reserved. Enjoy responsibly."}
    </Typography>
  );
}

const LoginComponent = (props) => {
  const classes = useStyles();
  const [email, setEmailAddress] = useState("");
  const [isDisabled, setSubmitState] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("hasura-id") ? true : false);


	if(isLoggedIn){
		return <Redirect to="/dashboard" />
	}

  const handleChange = (event) => {

    const validation = {
	    fieldName: "Email",
	    fieldValue: event.target.value,
    };
    const { status } = validateEmail(validation);

    (!status) ? setSubmitState(false) : setSubmitState(true);

    setEmailAddress(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          HIPBAR Support Portal
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => handleChange(event)}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => props.sendLoginEmail(email)}
	    disabled={isDisabled}
          >
            Send Login Email
          </Button>
          <Grid container>
            <Grid item xs>
              Having trouble? Contact Support at{" "}
              <Link href="mailto:support@hiipbar.com" variant="body2">
                support@hipbar.com
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

LoginComponent.propTypes = {
  sendLoginEmail: PropTypes.func,
}

export { LoginComponent };
