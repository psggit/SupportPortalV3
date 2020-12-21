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

  useEffect(() => {
    if (props.fetchOrderSuccess) {
      const details = getListOfDataObjects(
        props.orderList.order_modification,
        keysToRender
      );
      setData(details);
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
    props.sendSMSOperation(props.orderId);
  };

  const refreshOrder = () => {
    console.log("refreshOrder");
    const payload = {
      order_id: props.orderId,
    };
    props.fetchUpdatedStatus(payload);
  };

  const cancelOrder = () => {
    console.log("cancelOrder");
    setDisableClear(props.orderId);
    props.cancelOrderRequest(props.orderId);
  };

  const actionButtons = [
    <IconButton
      variant="outlined"
      color="primary"
      onClick={(event) => sendSMS()}
    >
      <SendIcon />
    </IconButton>,
    <IconButton
      variant="outlined"
      color="primary"
      onClick={(event) => refreshOrder()}
    >
      <AutorenewIcon />
    </IconButton>,
    <IconButton
      variant="outlined"
      color="primary"
      onClick={(event) => cancelOrder()}
    >
      <ClearIcon />
    </IconButton>,
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
        {props.fetchOrderSuccess &&
          props.orderList.order_modification.length !== null &&
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
        {/* <DetailsCard
          title="LATEST MODIFICATION DETAILS"
          // actions={
          //   localStorage.getItem("x-hasura-role") !== "support_person" &&
          //   actionButtons
          // }
          subheader={subheadAction}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="modification-details"
        /> */}
      </Grid>
    </Grid>
  );
};

OrderModificationComponent.propTypes = {
  fetchOrderSuccess: PropTypes.bool,
};

export { OrderModificationComponent };
