import React, { useEffect } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    flexGrow: 1,
  },
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
  marginTop: {
    margin: theme.spacing(4),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LogoutComponent = (props) => {
  const classes = useStyles();

  useEffect(() => {
    localStorage.clear();
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // document.cookie = "dinoisses='';expires=" + new Date().toUTCString();
    console.log("logout container");
    // props.logoutSession();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          HIPBAR Support Portal
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary" align="center">
                Having trouble? Contact Support at{" "}
                <Link href="mailto:support@hiipbar.com" variant="body2">
                  support@hipbar.com
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.marginTop}>
              <Alert severity="success">You have successfully logout out</Alert>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

LogoutComponent.propTypes = {
  logoutSession: PropTypes.func,
};

export { LogoutComponent };
