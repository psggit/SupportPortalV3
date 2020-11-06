import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { loginLogo } from "../../assets/images";
import ErrorMsg from "../../components/errorMsg";
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
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
  const [isLoggedIn] = useState(
    localStorage.getItem("hasura-id") ? true : false
  );
  // let open = null;
  const [successMsgData, setMsg] = useState("");
  const [successState, setSuccessState] = useState("");

  useEffect(() => {
    // console.log("-- loginProgressStatus ", props.loginProgressStatus);
    // console.log("-- ", props.loginSuccessStatus);
    if (props.loginSuccessStatus) {
      setMsg(props.successMsg.message);
      setSuccessState(true);
    } else {
      setSuccessState(false);
    }
    // successMsgData = props.successMsg.message;
  }, [props.loginSuccessStatus]);

  const handleChange = (event) => {
    const validation = {
      fieldName: "Email",
      fieldValue: event.target.value,
    };
    const { status } = validateEmail(validation);

    !status ? setSubmitState(false) : setSubmitState(true);

    setEmailAddress(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      sendEmail();
    }
  };

  const sendEmail = () => {
    props.sendLoginEmail(email);
    setSubmitState(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={loginLogo} />
        <Typography
          className={classes.title}
          component="h5"
          variant="h5"
          color="primary"
        >
          SUPPORT PORTAL
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
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => sendEmail()}
            disabled={isDisabled}
          >
            Send Login Email
          </Button>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary" align="center">
                Having trouble? Contact Support at{" "}
                <Link href="mailto:support@hiipbar.com" variant="body2">
                  support@hipbar.com
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
      {successState && (
        <ErrorMsg show={true} message={successMsgData} type="success" />
      )}
    </Container>
  );
};

LoginComponent.propTypes = {
  sendLoginEmail: PropTypes.func,
  loginProgressStatus: PropTypes.bool,
  loginSuccessStatus: PropTypes.bool,
  loginFailedStatus: PropTypes.bool,
  successMsg: PropTypes.any,
};

export { LoginComponent };
