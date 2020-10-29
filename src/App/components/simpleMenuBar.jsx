import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";

SimpleMenuBar.propTypes = {
  labels: PropTypes.array,
  orderId: PropTypes.any,
  children: PropTypes.any,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    width: "100%",
    color: theme.palette.primary.main,
    height: 64,
    position: "relative",
    zIndex: 1,
    boxShadow: "none",
    borderBottom: "1px solid #e5e5e5",
  },
  header: {
    height: "100vh",
  },
}));

export default function SimpleMenuBar(props) {
  const history = useHistory();
  const classes = useStyles();

  const goBack = () => {
    history.push("/order-info/" + props.orderId);
  };

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Grid alignItems="center" container className={classes.header}>
          <Grid item xs={1}>
            <Button
              color="primary"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => goBack()}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={11}>
            {props.children}
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
