import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";

import { useHistory } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsCard } from "./components/orderDetailsCard";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import DialogComponent from "../../components/dialog";

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

  useEffect(() => {
    if (props.orderId === null) {
      history.push("/dashboard");
    } else {
      let payload = {
        order_id: props.orderId,
      };
      payload = {
        order_id: "50011189094739",
      };
      props.fetchOrderInfo(props.orderId);
      props.fetchCancelReason(payload);
    }
  }, []);

  let loading = props.fetchOrderInfoProgress;
  console.log("props", props);
  if (loading) {
    return (
      <Box>
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      </Box>
    );
  }

  const dialogActions = [
    <Button variant="contained" color="primary" size="small" key="closeDialog">
      Cancel
    </Button>,
    <Button variant="contained" color="primary" size="small" key="createIssue">
      Create Issue
    </Button>,
  ];

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <DialogComponent
        title="ADD NEW ISSUE"
        subtitle={`ORDER ID: ` + props.orderId}
        actions={dialogActions}
        open={false}
      />
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
                {props.fetchCancelReasonSuccess &&
                  props.fetchOrderInfoSuccess && (
                    <OrderDetailsCard {...props} />
                  )}
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
              <Grid item xs={12}>
                <RetailerContainer />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <DeliveryAgentContainer />
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
  fetchOrderInfoProgress: PropTypes.bool,
};

export { OrderInfoComponent };
