import React, { useState } from "react";
import DeliveryAgentDetailsCard from "../../../components/orderInfoCard";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { Grid, CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

const keysToRender = [
  "delivery_agent_id",
  "delivery_agent_name",
  "delivery_agent_contact_number",
  "delivery_agnet_city_name",
  "delivery_agent_locality_name",
  "delivery_agent_status",
];
const keyMap = {
  delivery_agent_id: "Agent ID",
  delivery_agent_name: "Agent Name",
  delivery_agent_contact_number: "Mobile Number",
  delivery_agnet_city_name: "City",
  delivery_agent_locality_name: "Locality",
  delivery_agent_status: "Agent Limit",
};

const DeliveryAgentComponent = (props) => {
  console.log("[DeliveryAgentComponent]");
  // const orderId = props.orderInfo.order_id;
  const [deliveryAgentDetailsData, setDeliveryAgentDetailsData] = useState([]);

  // const classes = useStyles();

  console.log("useEffect", props);

  const retailerDetailsAction = [
    <Button variant="outlined" color="primary" key="unassignBtn">
      Unassign
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.fetchSuccess) {
    console.log("[DeliveryAgentComponent]");
    console.log(props.deliveryAgentNotes);
    props.fetchDeliveryAgentNotes(props.orderInfo.order_id);
    const deliveryAgentDetails = getListOfDataObjects(
      props.orderInfo,
      keysToRender
    );
    setDeliveryAgentDetailsData(deliveryAgentDetails);
    console.clear();
    console.log("[DeliveryAgentComponent]");
    console.log(deliveryAgentDetailsData);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DeliveryAgentDetailsCard
          title="Delivery Agent Details"
          actions={retailerDetailsAction}
          renderArray={deliveryAgentDetailsData}
          keyMap={keyMap}
          keysToRender={keysToRender}
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
    </Grid>
  );
};

DeliveryAgentComponent.propTypes = {
  fetchDeliveryAgentNotes: PropTypes.func,
  deliveryAgentNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
};

export { DeliveryAgentComponent };
