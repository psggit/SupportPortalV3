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

const keysToRender = [
  "delivery_agent_id",
  "delivery_agent_name",
  "delivery_agent_contact_number",
  "delivery_agnet_city_name",
  "delivery_agent_locality_name",
  "delivery_agent_limit",
];
const keyMap = {
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
  const [cancelReasonNote, setCancelReasonNote] = useState("");

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const handleTextChange = (e) => {
    setCancelReasonNote(e.target.value);
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

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      key="unassignBtn"
      onClick={mountUnassignDA}
      disabled={!props.orderInfo.order_status_button}
    >
      Unassign
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      key="reserveOrder"
      onClick={mountDialogBox}
      disabled={!props.orderInfo.order_status_button}
    >
      Reserve Order
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="callBtn"
      onClick={() =>
        props.handleCall(props.orderInfo.delivery_agent_contact_number)
      }
    >
      Call
    </Button>,
    <div>
      {showDialogBox && (
        <Dialog
          title="Reserve Orders"
          actions={[
            <Button
              variant="contained"
              color="primary"
              onClick={handleReserveOrder}
            >
              Yes
            </Button>,
            <Button
              variant="outlined"
              color="primary"
              onClick={unmountDialogBox}
            >
              No
            </Button>,
          ]}
        >
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
              {props.daListSuccess &&
                props.daList.data !== null &&
                props.daList.data.map((value, index) => {
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
              placeholder="Add cancel reason"
            />
          </>
        </Dialog>
      )}
    </div>,
    <div>
      {showUnassignDADialog && (
        <Dialog
          title="Unassign Delivery Agent"
          subtitle="Are you sure you want to un-assign the delivery agent for this order ?"
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
    </div>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DeliveryAgentDetailsCard
          title="Delivery Agent Details"
          actions={actionButtons}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="deliveryAgent-details"
        />
      </Grid>
      <Grid item xs={6}>
        <>
          {props.fetchSuccess && (
            <ActivityItem
              arr={props.deliveryAgentNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              title={"Delivery Agent Notes"}
              issueType={"delivery_agent"}
              subtitle={subheadNotesAction}
              click={props.openDialog}
              cardActions={true}
            />
          )}
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
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
      {props.unassignDAFail && (
        <ErrorMsg show={true} message={props.errorMsg} type="error" />
      )}
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
  unassignDASuccess: PropTypes.bool,
  errorMsg: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  formRoot: {
    padding: 36,
  },
  selectBox: {
    width: "100%",
  },
  textBox: {},
}));

export { DeliveryAgentComponent };
