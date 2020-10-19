/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DeliveryAgentDetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";
import Notification from "../../../components/notification";
import Dialog from "../../../components/dialog";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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

  const [data, setData] = useState([]);
  const [deliveryAgentList, setDeliveryAgentList] = useState([]);
  const [deliveryAgentIdx, setDeliveryAgentIdx] = useState(0);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showUnassignDADialog, setShowUnassignDADialog] = useState(false);
  const [message, setMessage] = useState("");
  const [cancelReasonNote, setCancelReasonNote] = useState("");

  useEffect(() => {
    setMessage(props.unassignDAFail);
  }, [props.unassignDAFail]);

  useEffect(() => {
    console.log("hellooo..");
    {
      props.daListSuccess && setDeliveryAgentList(props.daList.data)
    }
    //props.fetchDAList(props.orderInfo.retailer_id, props.orderInfo.order_id);
  }, []);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const handleClose = () => {
    setMessage(false);
  };

  const handleTextAreaChange = (e) => {
    setCancelReasonNote(e.target.value);
  };

  const handleChange = (e) => {
    setDeliveryAgentIdx(e.target.value);
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
      retailer_id: props.orderInfo.retailer_id,
      retailer_name: props.orderInfo.retailer_name,
      warehouse_id: props.orderInfo.warehouse_id,
      delivery_status: props.orderInfo.delivery_status,
      assigned_delivery_agent: props.orderInfo.delivery_agent_id,
      reserved_for_da_id: "515870",
      cancellation_reason: cancelReasonNote,
    };
    props.reserveDeliveryAgent(payload);
    setShowDialogBox(false);
  };

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      key="unassignBtn"
      onClick={mountUnassignDA}
    >
      Unassign
    </Button>,
    <Button
      variant="outlined"
      color="primary"
      key="unassignBtn"
      onClick={mountDialogBox}
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
          <div>
            <label>Delivery Agent List</label>
            <Select
              native
              className={classes.formControl}
              //onChange={handleChange}
            >
              {props.daListSuccess &&
                props.daList.data.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.name} - {item.id}
                    </option>
                  );
                })}
            </Select>
          </div>
          <div>
            <TextareaAutosize
              className={classes.formControlTextarea}
              aria-label="minimum height"
              rowsMin={3}
              onChange={handleTextAreaChange}
              placeholder="Enter your notes"
            />
          </div>
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
              click={props.openDialog}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
      {message && (
        <Notification
          message={props.errorMsg}
          messageType="info"
          open={message}
          handleClose={handleClose}
        />
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
};

const useStyles = makeStyles(theme => ({
  formRoot: {
    padding: 36,
  },
  formControl: {
    width: "100%",
    marginBottom: 24,
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10,
  },
}));

export { DeliveryAgentComponent };
