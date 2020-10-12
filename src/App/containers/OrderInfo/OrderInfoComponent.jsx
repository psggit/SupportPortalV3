import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsCard } from "./components/orderDetailsCard";
import { CustomerContainer } from "./CustomerDetails/CustomerContainer";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import DialogComponent from "../../components/dialog";
import Loading from "../../components/loading";

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
  marginTop: {
    marginTop: "25px",
  },
}));

const OrderInfoComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (props.orderId === null) {
      history.push("/dashboard");
    } else {
      // let payload = {
      //   order_id: props.orderInfo.order_id,
      // };
      let payload = {
        order_id: props.orderId,
      };
      props.fetchOrderInfo(props.orderId);
      props.fetchCancelReason(payload);
    }
  }, []);

  let loading = props.fetchOrderInfoProgress;
  const [issueType, setIssueType] = useState(null);
  const [open, setOpen] = useState(false);
  if (loading) {
    return <Loading message="Loading..." />;
  }

  const openDialog = (type) => {
    setIssueType(type);
    if (type == null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const dialogActions = [
    <Button
      variant="outlined"
      color="primary"
      key="closeDialog"
      onClick={() => openDialog(null)}
    >
      Cancel
    </Button>,
    <Button variant="contained" color="primary" key="createIssue">
      Create Issue
    </Button>,
  ];

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <DialogComponent
        title="ADD NEW ISSUE"
        subtitle={`Order ID: ` + props.orderId}
        actions={dialogActions}
        issueType={issueType}
        open={open}
        openDialog={openDialog}
      />
      <Box className={classes.boxContainer}>
        <Grid container>
          <Grid item xs={2}>
            <p>Order Tracking component</p>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={4} className={classes.marginTop}>
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
              <Grid item xs={12}>
                <CustomerContainer openDialog={openDialog} />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RetailerContainer openDialog={openDialog} />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <DeliveryAgentContainer openDialog={openDialog} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              border={1}
            >
              <Button color="primary">O</Button>
              <Button>C</Button>
              <Button>R</Button>
              <Button>D</Button>
            </Box>
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
  fetchOrderInfoProgress: PropTypes.bool,
  fetchCancelReasonProgress: PropTypes.bool,
  orderId: PropTypes.any,
  orderInfo: PropTypes.object,
};

export { OrderInfoComponent };
