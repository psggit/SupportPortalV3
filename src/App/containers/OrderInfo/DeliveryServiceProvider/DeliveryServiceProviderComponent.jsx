/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";
import DSPDetailsCard from "../../../components/orderInfoCard";
import { getListOfDataObjects } from "../../../utils/helpers";
import Dialog from "../../../components/dialog";
import ErrorMsg from "../../../components/errorMsg";

const keysToRender = [
  "assigned_delivery_service_provider",
  "delivery_service_provider_accepted_time",
];
const keyMap = {
  assigned_delivery_service_provider: "Assigned Delivery Service Provider",
  delivery_service_provider_accepted_time:
    "Delivery Service Provider Accepted Time",
};

const DeliveryServiceProviderComponent = (props) => {
  const [data, setData] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showDialogPush, setShowDialogPush] = useState(false);
  const [showOTPDialogBox, setShowOTPDialogBox] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  let otpNumber = "342343";

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    if (props.fetchOTPSuccess) {
      setShowOTPDialogBox(true);
    }
  }, [props.fetchOTPSuccess]);

  const handleCancelOrder = () => {
    props.cancelOrderDSP(props.orderInfo.order_id);
    setShowCancelOrder(false);
  };

  const handlePushOrder = () => {
    props.pushOrderOperation(props.orderInfo.order_id);
    setShowDialogPush(false);
  };

  const handleRestockOrder = () => {
    props.restockOrder(props.orderInfo.order_id);
    setShowDialogBox(false);
  };

  const handleOTP = () => {
    props.fetchOTPDSP(props.orderInfo.order_id);
    // setShowOTPDialogBox(true);
  };

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      key="unassignBtn"
      onClick={() => setShowDialogPush(true)}
      disabled={!props.orderInfo.push_order_to_dsp_button}
    >
      Push Order
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      key="reserveOrder"
      onClick={() => setShowDialogBox(true)}
      disabled={!props.orderInfo.restock_button}
    >
      Restock Order
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      key="fetchOTP"
      onClick={() => handleOTP(true)}
      disabled={!props.orderInfo.restock_button}
    >
      Fetch OTP
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      key="cancelBtnDSP"
      onClick={() => setShowCancelOrder(true)}
      disabled={!props.orderInfo.cancel_order_from_dsp_button}
    >
      Cancel Order
    </Button>,
    <div>
      {showDialogBox && (
        <Dialog
          title="Restock Order"
          subtitle="Are you sure you want to restock this order?"
          actions={[
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleRestockOrder()}
            >
              Yes
            </Button>,
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowDialogBox(false)}
            >
              No
            </Button>,
          ]}
        ></Dialog>
      )}
    </div>,
    <div>
      {showDialogPush && (
        <Dialog
          title="Push Order"
          subtitle="Are you sure you want to push this order?"
          actions={[
            <Button
              variant="contained"
              color="primary"
              onClick={handlePushOrder}
            >
              Yes
            </Button>,
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowDialogPush(false)}
            >
              No
            </Button>,
          ]}
        />
      )}
    </div>,
    <div>
      {showOTPDialogBox && (
        <Dialog
          title="OTP details"
          subtitle={otpNumber}
          actions={[
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowOTPDialogBox(false)}
            >
              Close
            </Button>,
          ]}
        />
      )}
    </div>,
    <div>
      {showCancelOrder && (
        <Dialog
          title="Cancel Order"
          subtitle="Are you sure you want to cancel this order?"
          actions={[
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelOrder}
            >
              Yes
            </Button>,
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowCancelOrder(false)}
            >
              No
            </Button>,
          ]}
        />
      )}
    </div>,
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <DSPDetailsCard
          title="DELIVERY SERVICE PROVIDER DETAILS"
          actions={actionButtons}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="dsp-details"
        />
      </Grid>
      {props.pushOrderFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
      {props.restockOrderFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
      {props.fetchOTPFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
      {props.cancelOrderDSPFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
      {props.pushOrderSuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
      {props.restockOrderSuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
      {props.cancelOrderDSPSuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
    </Grid>
  );
};

DeliveryServiceProviderComponent.propTypes = {
  orderInfo: PropTypes.any,
  pushOrderOperation: PropTypes.func,
  restockOrder: PropTypes.func,
  fetchOTPDSP: PropTypes.func,
  cancelOrderDSP: PropTypes.func,
  resetOnUnmount: PropTypes.func,
  pushOrderSuccess: PropTypes.bool,
  pushOrderFailed: PropTypes.bool,
  pushOrderProgress: PropTypes.bool,
  restockOrderSuccess: PropTypes.bool,
  restockOrderFailed: PropTypes.bool,
  restockOrderProgress: PropTypes.bool,
  fetchOTPSuccess: PropTypes.bool,
  fetchOTPFailed: PropTypes.bool,
  fetchOTPProgress: PropTypes.bool,
  cancelOrderDSPSuccess: PropTypes.bool,
  cancelOrderDSPFailed: PropTypes.bool,
  cancelOrderDSPProgress: PropTypes.bool,
  errorMsg: PropTypes.string,
  message: PropTypes.string,
};

export { DeliveryServiceProviderComponent };
