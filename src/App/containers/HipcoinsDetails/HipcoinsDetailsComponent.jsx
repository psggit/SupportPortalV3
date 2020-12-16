import React from "react";
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

const useStyles = makeStyles((theme) => ({
  row1: {
    padding: "16px",
  },
  row2: {
    padding: "16px",
  },
  root: {
    cursor: "pointer",
    alignItems: "center",
    paddingBottom: "5px",
  },
  boxContainer: {
    padding: 40,
  },
}));

function HipcoinsDetailsComponent(props) {
  const classes = useStyles();
  const history = useHistory();

  const details = props.loyalityPoints.order_details.filter(
    (item) => item.order_id === props.match.params.orderId
  );

  const OrderDetailsCard = () => {
    const keyMap = {
      order_id: "Order ID",
      consumer_id: "Customer ID",
      partner: "Partner",
      order_status: "Order Status",
      order_generated_time: "Order Generated Time",
    };
    const keysToRender = [
      "order_id",
      "consumer_id",
      "partner",
      "order_status",
      "order_generated_time",
    ];
    const customerAction = [
      <Button
        variant="contained"
        color="primary"
        key="unassignBtn"
        disabled={props.triggerEmailInProgress}
        onClick={() =>
          props.triggerEmail({ consumerId: details[0].consumer_id })
        }
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
          <Grid alignItems="center" container>
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
};

export { HipcoinsDetailsComponent };
