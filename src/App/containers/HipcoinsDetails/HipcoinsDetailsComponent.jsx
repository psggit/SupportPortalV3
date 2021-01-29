/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DetailsCard from "../../components/orderInfoCard";
import { getListOfDataObjects } from "../../utils/helpers";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ErrorMsg from "../../components/errorMsg";
import PropTypes from "prop-types";
import TopBar from "../../components/topBar";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Dialog from "../../components/dialog";

const useStyles = makeStyles((theme) => ({
  row1: {
    padding: "16px",
  },
  row2: {
    padding: "16px",
    maxWidth: "80%",
    margin: "0 auto",
  },
  root: {
    cursor: "pointer",
    alignItems: "center",
    paddingBottom: "5px",
  },
  header: {
    minHeight: 50,
  },
  boxContainer: {
    padding: 40,
  },
}));

function HipcoinsDetailsComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const [mountDialog, setMountDialog] = useState(false);

  const order_details =
    props.loyalityPoints !== null
      ? props.loyalityPoints.order_details
      : history.location.state.orderData;
  const [orderData, setOrderData] = useState(order_details);

  useEffect(() => {
    return () => {
      props.resetOnUnmount();
    };
  }, []);
  // console.log("props.loyalityPoints.order_details");
  // console.log(props.loyalityPoints.order_details, history.location.state, orderData);

  const details = orderData.filter(
    (item) => item.order_id === props.match.params.orderId
  );

  const handleTrigger = () => {
    setMountDialog(true);
  };

  const handleCancel = () => {
    setMountDialog(false);
  };

  const OrderDetailsCard = () => {
    const keyMap = {
      order_id: "Order ID",
      consumer_id: "Customer ID",
      consumer_email: "Customer Email",
      partner: "Partner",
      partner_order_status: "Partner Order Status",
      order_status: "Order Status",
      order_generated_time: "Order Generated Time",
    };
    const keysToRender = [
      "order_id",
      "consumer_id",
      "consumer_email",
      "partner",
      "partner_order_status",
      "order_status",
      "order_generated_time",
    ];
    const customerAction = [
      <Button
        variant="contained"
        color="primary"
        key="unassignBtn"
        disabled={props.triggerEmailInProgress}
        onClick={handleTrigger}
        // onClick={() =>
        //   props.triggerEmail({ consumerId: details[0].consumer_id })
        // }
      >
        Trigger
      </Button>,
    ];
    const data = getListOfDataObjects(details[0], keysToRender);
    return (
      <DetailsCard
        title="ORDER DETAILS"
        actions={customerAction}
        renderArray={data}
        keyMap={keyMap}
        keysToRender={keysToRender}
        id="order-details"
      />
    );
  };

  const OrderSummaryCard = () => {
    const keyMap = {
      conversion_rate: "Conversion Rate",
      total_price: "Total Price",
      hipcoins: "Hipcoins",
      nodal_amount: "Nodal Amount",
    };
    const keysToRender = [
      "conversion_rate",
      "total_price",
      "hipcoins",
      "nodal_amount",
    ];
    const data = getListOfDataObjects(details[0], keysToRender);
    return (
      <DetailsCard
        title="ORDER SUMMARY"
        renderArray={data}
        keyMap={keyMap}
        keysToRender={keysToRender}
        id="order-summary"
      />
    );
  };

  const ProductDetailsCard = () => {
    const keyMap = {
      product_id: "Product ID",
      product_name: "Product Name",
      product_quantity: "Product Quantity",
      partner_order_id: "Partner Order ID",
    };
    const keysToRender = [
      "product_id",
      "product_name",
      "product_quantity",
      "partner_order_id",
    ];
    const data = getListOfDataObjects(details[0], keysToRender);
    return (
      <DetailsCard
        title="Product Details"
        renderArray={data}
        keyMap={keyMap}
        keysToRender={keysToRender}
        id="product-details"
      />
    );
  };

  const handleBack = () => {
    history.push(`/hipcoins`);
  };

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <Paper className={classes.root}>
          <Grid alignItems="center" container className={classes.header}>
            <Grid item xs={1}>
              <Button
                color="primary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.row1}>
          <Typography>
            <p>ORDER ID: {props.match.params.orderId}</p>
          </Typography>
        </div>
        <div className={classes.row2}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <OrderDetailsCard />
            </Grid>
            <Grid item xs={4}>
              <OrderSummaryCard />
            </Grid>
            <Grid item xs={4}>
              <ProductDetailsCard />
            </Grid>
          </Grid>
        </div>
        {mountDialog && (
          <Dialog
            title={"Trigger Email"}
            actions={[
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  props.triggerEmail(
                    { consumerId: details[0].consumer_id },
                    setMountDialog(false)
                  )
                }
              >
                Confirm
              </Button>,
            ]}
          >
            <Typography>
              {"Are you sure you want to trigger this email?"}
            </Typography>
          </Dialog>
        )}
        {props.triggerEmailFailed && (
          <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
        )}
        {props.triggerEmailSuccess && (
          <ErrorMsg show={true} message={props.successMsg} type={"success"} />
        )}
      </div>
    </>
  );
}

HipcoinsDetailsComponent.propTypes = {
  triggerEmailFailed: PropTypes.bool,
  triggerEmailSuccess: PropTypes.bool,
  triggerEmailInProgress: PropTypes.bool,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
  loyalityPoints: PropTypes.object,
  resetOnUnmount: PropTypes.func,
};

export { HipcoinsDetailsComponent };
