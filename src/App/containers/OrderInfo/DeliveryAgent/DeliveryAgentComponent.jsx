import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DeliveryAgentDetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

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
  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const actionButtons = [
    <Button variant="outlined" color="primary" key="unassignBtn">
      Unassign
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
              cardActions={true}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
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
};

export { DeliveryAgentComponent };
