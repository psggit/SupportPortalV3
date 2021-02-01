/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DeliveryAgentDetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";
import Dialog from "../../../components/dialog";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ErrorMsg from "../../../components/errorMsg";
import uuid from "react-uuid";
import Alert from "@material-ui/lab/Alert";

let keysToRender = [
  "delivery_agent_id",
  "delivery_agent_name",
  "delivery_agent_contact_number",
  "delivery_agnet_city_name",
  "delivery_agent_locality_name",
  "delivery_agent_limit",
];
let keyMap = {
  delivery_agent_id: "Agent ID",
  delivery_agent_name: "Agent Name",
  delivery_agent_contact_number: "Mobile Number",
  delivery_agnet_city_name: "City",
  delivery_agent_locality_name: "Locality",
  delivery_agent_limit: "Agent Limit",
};

const DeliveryAgentComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [selectedValue, setValue] = useState("");
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showUnassignDADialog, setShowUnassignDADialog] = useState(false);
  const [showUnreserveDADialog, setShowUnreserveDADialog] = useState(false);
  const [cancelReasonNote, setCancelReasonNote] = useState("");
  const [showError, setShowError] = useState(false);
  let [heading, setHeading] = useState("Delivery Agent Details");
  //const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    let details = {};
    if (props.orderInfo.reserved_for_da_id === null) {
      details = getListOfDataObjects(props.orderInfo, keysToRender);
    } else {
      keysToRender = [
        "id",
        "name",
        "mobile_number",
        "city",
        "address",
        "agent_limit",
      ];
      keyMap = {
        id: "Agent ID",
        name: "Agent Name",
        mobile_number: "Mobile Number",
        city: "City",
        address: "Address",
        agent_limit: "Agent Limit",
      };
      setHeading("Delivery Agent Details (Reserve)");
      details = getListOfDataObjects(
        props.orderInfo.reserved_da_info,
        keysToRender
      );
    }

    setData(details);
    if (localStorage.getItem("x-hasura-role") !== "ops_delivery_manager") {
      props.fetchNotes(props.orderInfo.order_id);
      props.fetchDaIssueList();
    }

    return () => {
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    if (props.daListSuccess && props.daList.data === null) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [props.daListSuccess]);

  useEffect(() => {
    if (props.reserveDaSuccess) {
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
    if (props.fetchUnreserveDASuccess) {
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, [props.reserveDaSuccess, props.fetchUnreserveDASuccess]);

  const handleTextChange = (e) => {
    setCancelReasonNote(e.target.value);
    // setDisableBtn(false);
    // if (selectedValue !== "") {
    //   setDisableBtn(true);
    // }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const mountDialogBox = () => {
    props.fetchDAList(props.orderInfo.retailer_id, props.orderInfo.order_id);
    setShowDialogBox(true);
  };

  const unmountDialogBox = () => {
    setShowDialogBox(false);
  };

  const mountUnassignDA = () => {
    setShowUnassignDADialog(true);
  };

  const unmountUnassignDA = () => {
    setShowUnassignDADialog(false);
  };

  const handleUnassignDA = () => {
    props.unassignDeliveryAgent(props.orderInfo.order_id);
    setShowUnassignDADialog(false);
  };

  const mountUnreserveDialogBox = () => {
    setShowUnreserveDADialog(true);
  };

  const handleUnreserveDA = () => {
    props.unreserveDeliveryAgent(props.orderInfo.order_id);
    setShowUnreserveDADialog(false);
  };

  const unmountUnreserveDA = () => {
    setShowUnreserveDADialog(false);
  };

  const handleReserveOrder = () => {
    const payload = {
      order_id: props.orderInfo.order_id,
      retailer_id: parseInt(props.orderInfo.retailer_id),
      retailer_name: props.orderInfo.retailer_name,
      warehouse_id: parseInt(props.orderInfo.warehouse_id),
      delivery_status: props.orderInfo.delivery_status,
      assigned_delivery_agent: parseInt(props.orderInfo.delivery_agent_id),
      reserved_for_da_id: parseInt(selectedValue),
      cancellation_reason: cancelReasonNote,
    };
    props.reserveDeliveryAgent(payload);
    setShowDialogBox(false);
  };

  const handleNotesChange = () => {
    history.push({
      pathname: "/da-notes",
      state: {
        customerId: props.orderInfo.customer_id,
        orderId: props.orderInfo.order_id,
      },
    });
  };

  const subheadNotesAction = [
    <Button
      className={classes.moreButton}
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleNotesChange}
    >
      More
    </Button>,
  ];

  let actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      key={uuid()}
      onClick={mountDialogBox}
      disabled={!props.orderInfo.change_retailer_button}
    >
      Reserve Order
    </Button>,
  ];

  if (props.orderInfo.is_reserve_da) {
    actionButtons = [
      <Button
        variant="outlined"
        color="primary"
        key={uuid()}
        onClick={mountUnreserveDialogBox}
        disabled={!props.orderInfo.is_reserve_da}
      >
        Unreserve Order
      </Button>,
    ];
  }

  if (
    props.orderInfo.delivery_status === "Assigned to Delivery Agent" &&
    props.orderInfo.delivery_agent_id !== null
  ) {
    actionButtons = [
      <Button
        variant="outlined"
        color="primary"
        key={uuid()}
        onClick={mountUnassignDA}
        disabled={
          props.orderInfo.delivery_status !== "Assigned to Delivery Agent"
        }
      >
        Unassign
      </Button>,
    ];
  }

  const keysToRenderInNotesCard = ["notes", "created_at"];
  let actionBtns = [
    <Button variant="outlined" color="primary" onClick={unmountDialogBox}>
      {!showError ? "No" : "Close"}
    </Button>,
  ];

  if (!showError && !props.daListProgress) {
    actionBtns = [
      <Button
        variant="contained"
        color="primary"
        onClick={handleReserveOrder}
        // disabled={!disableBtn}
      >
        Yes
      </Button>,
      <Button variant="outlined" color="primary" onClick={unmountDialogBox}>
        No
      </Button>,
    ];
  }

  let cardTitle = heading;

  if (
    props.orderInfo.delivery_agent_id === props.orderInfo.reserved_da_info.id
  ) {
    // setHeading("Delivery Agent Details");
    cardTitle = "Delivery Agent Details";
  }

  

  // console.log("[DA-component]", props.daList)

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DeliveryAgentDetailsCard
          title={cardTitle}
          actions={
            localStorage.getItem("x-hasura-role") !== "support_person" &&
            actionButtons
          }
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="deliveryAgent-details"
        />
      </Grid>
      <Grid item xs={6}>
        <>
          <ActivityItem
            arr={
              props.deliveryAgentNotes
                ? props.deliveryAgentNotes.orderNotes
                : []
            }
            keysToRender={keysToRenderInNotesCard}
            title={"Delivery Agent Notes"}
            issueType={"delivery_agent"}
            subtitle={subheadNotesAction}
            click={props.openDialog}
            cardActions={true}
            success={props.fetchSuccess}
            fail={props.fetchFailed}
            errorMsg={props.errorMsg}
          />
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
      {props.unassignDASuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
      {props.reserveDaSuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
      {props.reserveDaFail && (
        <ErrorMsg
          show={true}
          message={props.errorMessageReserve}
          type="error"
        />
      )}
      {props.unassignDAFail && (
        <ErrorMsg
          show={true}
          message={props.errorMessageUnassign}
          type="error"
        />
      )}
      <div>
        {showDialogBox && (
          <Dialog
            title="Reserve Order"
            actions={actionBtns}
            className={classes.minHeightDiv}
          >
            {props.daListProgress && (
              <Alert severity="info">{"Fetching details..."}</Alert>
            )}
            {showError && <Alert severity="error">{props.message}</Alert>}
            {props.daListSuccess && props.daList.data !== null && (
              <>
                <InputLabel id="demo-simple-select-label">
                  Delivery Agent List
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className={classes.selectBox}
                  onChange={(event) => handleChange(event)}
                >
                  {props.daList.data.map((value, index) => {
                    if (selectedValue === value) {
                      return (
                        <MenuItem value={value.id} key={index} selected={true}>
                          {value.name}-{value.id}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem value={value.id} key={index}>
                          {value.name}-{value.id}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
                <TextField
                  id="outlined-multiline-static"
                  className={classes.textBox}
                  onChange={handleTextChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  margin="normal"
                  size="small"
                  placeholder="Add reserve reason"
                />
              </>
            )}
          </Dialog>
        )}
      </div>
      <div>
        {showUnassignDADialog && (
          <Dialog
            title="Unassign Delivery Agent"
            subtitle="Are you sure you want to un-assign the delivery agent for this order?"
            actions={[
              <Button
                variant="contained"
                color="primary"
                onClick={handleUnassignDA}
              >
                Yes
              </Button>,
              <Button
                variant="outlined"
                color="primary"
                onClick={unmountUnassignDA}
              >
                No
              </Button>,
            ]}
          />
        )}
      </div>
      {props.daListFail && (
        <ErrorMsg show={true} message={props.message} type="error" />
      )}
      {props.fetchUnreserveDASuccess && (
        <ErrorMsg show={true} message={props.message} type="success" />
      )}
      {props.fetchUnreserveDAFailed && (
        <ErrorMsg
          show={true}
          message={props.errorMessageUnreserve}
          type="error"
        />
      )}
      <div>
        {showUnreserveDADialog && (
          <Dialog
            title="Unreserve Delivery Agent"
            subtitle="Are you sure you want to unreserve the delivery agent for this order?"
            actions={[
              <Button
                variant="contained"
                color="primary"
                onClick={handleUnreserveDA}
              >
                Yes
              </Button>,
              <Button
                variant="outlined"
                color="primary"
                onClick={unmountUnreserveDA}
              >
                No
              </Button>,
            ]}
          />
        )}
      </div>
    </Grid>
  );
};

DeliveryAgentComponent.propTypes = {
  fetchNotes: PropTypes.func,
  deliveryAgentNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
  handleCall: PropTypes.func,
  daListSuccess: PropTypes.bool,
  unassignDeliveryAgent: PropTypes.func,
  reserveDeliveryAgent: PropTypes.func,
  fetchDAList: PropTypes.func,
  unassignDAFail: PropTypes.bool,
  reserveDaFail: PropTypes.bool,
  reserveDaSuccess: PropTypes.bool,
  message: PropTypes.any,
  daList: PropTypes.object,
  daListFail: PropTypes.bool,
  unassignDASuccess: PropTypes.bool,
  errorMsg: PropTypes.string,
  resetOnUnmount: PropTypes.func,
  fetchDaIssueListSuccess: PropTypes.bool,
  fetchDaIssueList: PropTypes.func,
  fetchFailed: PropTypes.bool,
  errorMessageUnassign: PropTypes.string,
  errorMessageReserve: PropTypes.string,
  daListProgress: PropTypes.bool,
  unreserveDeliveryAgent: PropTypes.func,
  errorMessageUnreserve: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  formRoot: {
    padding: 36,
  },
  selectBox: {
    width: "100%",
  },
  minHeightDiv: {
    minHeight: 200,
  },
}));

export { DeliveryAgentComponent };
