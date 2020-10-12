import React, { useEffect, useState } from "react";
import DeliveryAgentDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "../../../components/dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getListOfDataObjects } from "../../../utils/helpers";

const useStyles = makeStyles(() => ({
  formRoot: {
    padding: 24,
  },
  card: {
    width: 520,
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10,
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060",
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  ListItemRoot: {
    width: "100%",
    borderBottom: "1px solid #E5E5E5",
    fontSize: 16,
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
  },
}));

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

const RenderDeliveryAgentDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {props.deliveryAgentDetails.map((item, index) => {
          return (
            <ListItem
              key={index}
              classes={{ root: classes.ListCustomerItem }}
              disableGutters={true}
            >
              <ListItemText
                primary={keyMap[keysToRender[index]]}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
              <ListItemText
                primary={
                  item[keysToRender[index]] ? item[keysToRender[index]] : "-"
                }
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

const DeliveryAgentComponent = (props) => {
  console.log("[DeliveryAgentComponent]");
  // const orderId = props.orderInfo.order_id;
  const [deliveryAgentDetailsData, setDeliveryAgentDetailsData] = useState([]);

  useEffect(() => {
    props.fetchDeliveryAgentNotes(props.orderInfo.order_id);
    const customerDetails = getListOfDataObjects(props.orderInfo, keysToRender);
    setDeliveryAgentDetailsData(customerDetails);
  }, []);

  const classes = useStyles();

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
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DeliveryAgentDetailsCard
          title="Delivery Agent Details"
          actions={retailerDetailsAction}
        >
          <RenderDeliveryAgentDetails
            deliveryAgentDetails={deliveryAgentDetailsData}
          />
        </DeliveryAgentDetailsCard>
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
