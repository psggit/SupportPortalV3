/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DetailsCard from "../../../components/orderInfoCard";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { getListOfDataObjects } from "../../../utils/helpers";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { IconButton } from "@material-ui/core";
import ErrorMsg from "../../../components/errorMsg";

const keysToRender = [
  "order_id",
  "hipbar_wallet",
  "gift_wallet",
  "nodal_amount",
  "request_by_id",
  "cancelled_by",
  "cancelled_by_id",
  "status",
  "created_at",
  "updated_at",
];
const keyMap = {
  order_id: "Modification ID",
  hipbar_wallet: "Hipbar Wallet",
  gift_wallet: "Gift Wallet",
  nodal_amount: "Nodal Amount",
  request_by_id: "Modified By (ID)",
  cancelled_by: "Cancelled By",
  cancelled_by_id: "Cancelled By (ID)",
  status: "Status",
  created_at: "Created At",
  updated_at: "Updated At",
};

const OrderModificationComponent = (props) => {
  const [data, setData] = useState([]);
  const [disableClear, setDisableClear] = useState("");
  const [orderIds, setOrderIds] = useState();

  useEffect(() => {
    if (
      props.fetchModificationSuccess &&
      props.orderList.order_modification.length > 0
    ) {
      const orderId = props.orderList.order_modification[0].order_id;
      const details = getListOfDataObjects(
        props.orderList.order_modification[0],
        keysToRender
      );
      setData(details);
      setOrderIds(orderId);
    }
  }, []);

  const history = useHistory();
  const handleChange = () => {
    history.push({
      pathname: "/modification-list",
      state: {
        orderId: props.orderId,
      },
    });
  };

  const sendSMS = () => {
    props.sendSMSOperation(orderIds);
  };

  const refreshOrder = () => {
    const payload = {
      order_id: orderIds,
    };
    props.fetchUpdatedStatus(payload);
  };

  const cancelOrder = () => {
    setDisableClear(orderIds);
    props.cancelOrderRequest(orderIds);
    setTimeout(() => {
      sessionStorage.setItem("mode", null);
      sessionStorage.setItem("modifyCartInfo", null);
      sessionStorage.setItem("modifiedCart", null);
      location.reload();
    }, 1500);
  };

  const actionButtons = [
    <Button variant="outlined" color="primary" onClick={(event) => sendSMS()}>
      Send SMS
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      onClick={(event) => refreshOrder()}
    >
      Update Status
    </Button>,
    <Button
      variant="contained"
      color="primary"
      onClick={(event) => cancelOrder()}
    >
      Cancel Request
    </Button>,
  ];

  const subheadAction = [
    <Button
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleChange}
    >
      More
    </Button>,
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        {props.fetchModificationSuccess &&
          props.orderList.order_modification.length > 0 && (
            <DetailsCard
              title="LATEST MODIFICATION DETAILS"
              actions={
                localStorage.getItem("x-hasura-role") !== "support_person" &&
                actionButtons
              }
              subheader={subheadAction}
              renderArray={data}
              keyMap={keyMap}
              keysToRender={keysToRender}
              id="modification-details"
            />
          )}
        {(props.sendSMSSuccess || props.sendSMSFailed) && (
          <ErrorMsg show={true} message={props.msg} type={"info"} />
        )}
        {(props.fetchUpdatedStatusSuccess ||
          props.fetchUpdatedStatusFailed) && (
          <ErrorMsg
            show={true}
            message={props.updatedStatusMsg.payload.message}
            type={"info"}
          />
        )}
        {props.fetchCancelCartSuccess && (
          <ErrorMsg
            show={true}
            message={"Order cancelled successfully."}
            type="success"
          />
        )}
      </Grid>
    </Grid>
  );
};

OrderModificationComponent.propTypes = {
  fetchModificationSuccess: PropTypes.bool,
  fetchCancelCartSuccess: PropTypes.bool,
  fetchUpdatedStatusFailed: PropTypes.bool,
  sendSMSSuccess: PropTypes.bool,
  sendSMSFailed: PropTypes.bool,
};

export { OrderModificationComponent };
