import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
    border: "1px solid",
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

const OrderInfoComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (props.orderId === null) {
      history.push("/dashboard");
    } else {
      props.fetchOrderInfo(props.orderId);
    }
  }, []);

  if (props.fetchOrderInfoSuccess) {
    // console.clear();
    console.log("fetchedOrderInfo");
    console.log(props);
  }

  return (
    <Container component="main">
      <TopBar />
      <Box className={classes.boxContainer}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <p>Order Tracking component</p>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={4}>
              <Grid item xs={6}>Cart</Grid>
              <Grid item xs={6}>Order Details + Activity Log</Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>Customer Details</Grid>
              <Grid item xs={6}>Customer Notes</Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>Retailer Details</Grid>
              <Grid item xs={6}>Retailer Notes</Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>Delivery Agent Details</Grid>
              <Grid item xs={6}>Delivery Agent Notes</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchOrderInfoSuccess: PropTypes.bool,
  orderId: PropTypes.any,
  orderInfo: PropTypes.object,
};

export { OrderInfoComponent };
