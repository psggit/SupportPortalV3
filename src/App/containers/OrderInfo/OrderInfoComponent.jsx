import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";

import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsCard } from "./components/orderDetailsCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.body1,
  },
  boxContainer: {
    margin: "0 auto",
    fontFamily: theme.typography,
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
  console.log(props);

  useEffect(() => {
    if (props.orderId === null) {
      // history.push("/dashboard");
    } else {
      // let payload = {
      //   order_id: props.orderInfo.order_id,
      // };
      let payload = {
        order_id: "50011189094739",
      };
      props.fetchOrderInfo(props.orderId);
      props.fetchCancelReason(payload);
    }
  }, []);
  console.log(props);

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <Box className={classes.boxContainer}>
        <Grid container>
          <Grid item xs={2}>
            <p>Order Tracking component</p>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <CartContainer {...props} />
              </Grid>
              <Grid item xs={6}>
                {props.fetchCancelReasonSuccess ? (
                  <OrderDetailsCard {...props} />
                ) : null}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                Customer Details
              </Grid>
              <Grid item xs={6}>
                Customer Notes
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                Retailer Details
              </Grid>
              <Grid item xs={6}>
                Retailer Notes
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                Delivery Agent Details
              </Grid>
              <Grid item xs={6}>
                Delivery Agent Notes
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchCancelReason: PropTypes.func,
  cancelReasons: PropTypes.object,
  fetchOrderInfoSuccess: PropTypes.bool,
  fetchCancelReasonSuccess: PropTypes.bool,
  orderId: PropTypes.any,
  orderInfo: PropTypes.object,
};

export { OrderInfoComponent };