import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TopBar from "../../components/topBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
  },
  card: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  buttonDiv: {
    textAlign: "right",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: "auto",
  },
  heading: {
    fontSize: "16px",
    lineHeight: "22px",
  },
}));

const CartComponent = (props) => {
  useEffect(() => {
    console.log("CartComponent");
  }, []);
  // const classes = useStyles();

  return (
    <Container component="main">
      <TopBar />
    </Container>
  );
};

CartComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  orderData: PropTypes.object,
};

export { CartComponent };
